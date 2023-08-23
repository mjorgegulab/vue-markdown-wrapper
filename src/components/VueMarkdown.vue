<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export interface Props {
    md: string | null
    silent?: boolean
    breaks?: boolean
    gfm?: boolean
    pedantic?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    md: null,
    silent: false,
    breaks: false,
    gfm: true,
    pedantic: false
})

const renderedMarkdown = ref('');

const computedMarkdown = computed(() => props.md)

const computedMarkedOptions = computed(() => {
    return {
        ...(typeof props.silent === 'boolean' ? { silent: props.silent } : { silent: false }),
        ...(typeof props.breaks === 'boolean' ? { breaks: props.breaks } : { breaks: false }),
        ...(typeof props.gfm === 'boolean' ? { gfm: props.gfm } : { gfm: true }),
        ...(typeof props.pedantic === 'boolean' ? { pedantic: props.pedantic } : { pedantic: false }),
    }
})

const sanitize = (html: string) => DOMPurify.sanitize(html);

watch(computedMarkdown, async (newValue) => {
    if (newValue) renderedMarkdown.value = sanitize(await marked.parse(newValue, { async: true, ...computedMarkedOptions.value }))
})
</script>

<template>
    <div v-if="renderedMarkdown" v-html="renderedMarkdown"></div>
</template>