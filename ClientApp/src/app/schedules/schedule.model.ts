import { Local } from "../locals/local.model";

export class Schedule{
    local:Local;
    from:number = Date.now();
    to:number = Date.now();
}