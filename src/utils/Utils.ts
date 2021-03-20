import axios from 'axios';

export let utils = {

    formatDate: function formatDate(timestamp: number | undefined): string {
        if (!timestamp) return "";
        let localDate = new Date(0);
        localDate.setUTCSeconds(timestamp);
        let isoString = localDate.toISOString();
        return isoString.substring(0, 19).replace("T", " ");
    },

    hasDefaultAction: function hasDefaultAction(halForms: HalForms): boolean {
        return this.hasAction(halForms, "default");
    },
    
    hasAction: function hasAction(halForms: HalForms, action: string): boolean {
        if (action in halForms._templates) {
            const template = halForms._templates[action] as Template;
            return true;
        }
        return false;
    },

    applyDefaultAction: function applyDefaultAction(halForms: HalForms): Promise<Envelope> {
        return this.applyAction(halForms, "default");
    },

    applyAction: function applyAction(halForms: HalForms, action: string): Promise<Envelope> {
        const hasAction = this.hasAction(halForms, action);
        return new Promise<Envelope>((resolve, reject) => {
            if (!hasAction) {
                console.warn(`Could not find ${action} in _templates object ${halForms._templates}`);
                reject();
            }
            const template = halForms._templates[action] as Template;
            const target = template.target || "self";
            if (target in halForms._links) {
                const link = halForms._links[target] as Link;
                resolve({status: "OK", data: {}});
            } else {
                console.warn(`Could not find ${target} in _links object ${halForms._links}`);
                reject();
            }
        });
    }
    
}

export interface HalForms {
    _links: any,
    _templates: any
}

interface Link {
    key: string,
    href: string
}

interface Template {
    key: string,
    method: MethodType,
    target?: string,
    title?: string
}

enum MethodType {
    GET,
    POST,
    PATCH,
    DELETE
}

interface Envelope {
    status: "OK" | "ERROR",
    data?: any,
    error?: any
}
