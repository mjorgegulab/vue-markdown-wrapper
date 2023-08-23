export interface Props {
    md: string | null;
    silent?: boolean;
    breaks?: boolean;
    gfm?: boolean;
    pedantic?: boolean;
}
declare const _default: import("vue").DefineComponent<{
    md: {
        type: import("vue").PropType<string | null>;
        required: true;
        default: null;
    };
    silent: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    breaks: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    gfm: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    pedantic: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    md: {
        type: import("vue").PropType<string | null>;
        required: true;
        default: null;
    };
    silent: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    breaks: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    gfm: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    pedantic: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}>>, {
    md: string | null;
    silent: boolean;
    breaks: boolean;
    gfm: boolean;
    pedantic: boolean;
}, {}>;
export default _default;
