<p align="center">
  <img alt="Mantis Bug Tracker Issue Creation" src="https://imgur.com/jkm2f4p.png">
</p>

Vue Markdown component based on marked library 📚📙

## [![CodeQL](https://github.com/mjorgegulab/vue-markdown-wrapper/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/mjorgegulab/vue-markdown-wrapper/actions/workflows/github-code-scanning/codeql) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/96b6ee9771a44138bd3ed6460f210c5d)](https://app.codacy.com/gh/mjorgegulab/vue-markdown-wrapper/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade) [![Known Vulnerabilities](https://snyk.io/test/github/mjorgegulab/vue-markdown-wrapper/badge.svg)](https://snyk.io/test/github/mjorgegulab/vue-markdown-wrapper)

## Install

```bash
yarn add vue-markdown-wrapper
# - or -
npm install vue-markdown-wrapper
```

### Usage Example

```vue
<template>
    <div>
        <VueMarkdown :md="this.md"></VueMarkdown>
    </div>
</template>

<script lang="ts">
import { VueMarkdown } from 'vue-markdown-wrapper';
export default defineComponent({
    data() {
        return {
            md: null,
        };
    },
    async mounted() {
        // FETCH MARKDOWN SAMPLE
        const __md = await (await fetch('/sample01.md')).text();
        this.md = __md as any;
    },
});
</script>
```

#### Results
<p align="center">
  <img src="https://imgur.com/K10m6Ol.png" width="49%" style="padding: 5px">
  <img src="https://imgur.com/0vioUwg.png" width="49%" style="padding: 5px">
</p>


### Component Props

| Key Name   | Required | Example         | Default Value | Description                                                                                                  |
| ---------- | -------- | --------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| `md`       | Yes      | `__hello__`     | `null`        | The markdown text                                                                                            |
| `silent`   | No       | `true \| false` | `false`       | If true, the parser does not throw any exception or log any warning. Any error will be returned as a string. |
| `breaks`   | No       | `true \| false` | `false`       | If true, add <br> on a single line break                                                                     |
| `gfm`      | No       | `true \| false` | `true`        | Use approved Github Flavored                                                                                 |
| `pedantic` | No       | `true \| false` | `false`       | Conform to the original markdown.pl                                                                          |

## Contributing to this project

PRs and Issues are welcome. 😘

## License

Copyright © thewolfx41 - Released under the MIT License.
