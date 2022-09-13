import joi from 'joi';

export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/).required(),
        //senha forte: no minimo 8 digitos: letra maiúscula, minúscula, número e caractere especial
  confirmPassword: joi.valid(joi.ref('password')).required()
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/).required()
});