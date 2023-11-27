import { Component, Input } from "@angular/core";
class InputType {
    type: string;
    name: string;
    label: string;
    value: string;
    constructor(type: string, name: string, label: string, value: string) {
        this.type = type;
        this.name = name;
        this.label = label;
        this.value = value;
    }
}
class Inputs<T extends Record<string, any>> {
    inputs: InputType[];
    constructor(data: T) {
        this.inputs = [];
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                let value = data[key];
                if (typeof value !== "object") {
                    let name = key;
                    let label = "write " + key;
                    value = value.toString();
                    let type = typeof value === "number" ? "number" : "text";
                    if (key === "id") {
                        type = "hidden";
                    }
                    this.inputs.push(new InputType(type, name, label, value));
                }
            }
        }
    }
}
export { InputType, Inputs };