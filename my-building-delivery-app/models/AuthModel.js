
import { ROLES } from "../constants/roles.js";


export const AuthService = (
    () => {
        const funcLogin = async (username, password) => {
            return new Promise(
                (resolve, reject) => {
                    setTimeout(
                        () => {
                            if (username === "porteiro" && password === "123") {
                                resolve(
                                    {
                                        user: {
                                            id: "porter1",
                                            username: "porteiro",
                                            role: ROLES.DOORMAN,
                                        },
                                    }
                                );
                            }
                            // else if (username === "morador101" && password === "123") {
                            //     resolve(
                            //         {
                            //             user: {
                            //                 id: "resident101",
                            //                 username: "morador101",
                            //                 role: ROLES.RESIDENT,
                            //                 unit_number: "101",
                            //             },
                            //         }
                            //     );
                            // }
                            // else if (username === "morador202" && password === "123") {
                            //     resolve(
                            //         {
                            //             user: {
                            //                 id: "resident202",
                            //                 username: "morador202",
                            //                 role: ROLES.RESIDENT,
                            //                 unit_number: "202",
                            //             },
                            //         }
                            //     );
                            // }
                            else {
                                reject(
                                    new Error("Credenciais inválidas.")
                                );
                            }
                        }, 1000
                    );
                }
            );
        };

        return {
            funcLogin,
        };
    }
)();