
import * as Yup from "yup";


export const DeliverySchema = (
    Yup
        .object()
        .shape(
            {
                unit_number: Yup
                    .string()
                    .required("Número do apartamento é obrigatório")
                    .matches(/^\d+$/, "Deve conter apenas números"),

                addressee_name: Yup
                    .string()
                    .required("Nome da pessoa é obrigatório"),

                quantity_units: Yup
                    .number()
                    .required("Quantidade de unidades é obrigatória")
                    .min(1, "A quantidade deve ser no mínimo 1")
                    .integer("A quantidade deve ser um número inteiro"),

                description: Yup
                    .string().
                    required("Descrição é obrigatória"),
            }
        )
);