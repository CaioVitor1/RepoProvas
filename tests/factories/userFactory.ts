import {faker} from "@faker-js/faker"

export default async function createBodyUser(){
    return {
        email: faker.internet.email(),
        password: "Caio123*",
        confirmPassword: "Caio123*"
    };

}