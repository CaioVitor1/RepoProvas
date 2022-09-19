import {faker} from "@faker-js/faker"

export async function createBodyUser(){
    return {
        email: faker.internet.email(),
        password: "Caio123*",
        confirmPassword: "Caio123*"
    };

}
export async function passwordIncorret(){
    return {
        email: faker.internet.email(),
        password: "caio123*",
        confirmPassword: "caio123*"
    };

}