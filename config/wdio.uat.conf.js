import {config as baseConfig} from "../wdio.conf";

export const config = Object.assign(baseConfig, {
    environment: "TEST",
    email: "autotest1",
    firstName: "Sarah",
    password: "pass1",
    baseUrl: "https://automationteststore.com/"
})