

import * as Yup from "yup";

export const LoginSchema = (
    Yup
        .object()
        .shape(
            {
                username: Yup
                    .string()
                    .required("O Usuário é obrigatório."),

                password: Yup
                    .string()
                    .required("A senha é obrigatória."),
            }
        )
);
