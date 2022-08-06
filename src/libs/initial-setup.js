import Role from "../../db/models/role.js";

export const createRoles = async () => {
    console.log('Paso 1');
    try {
        const count = await Role.estimatedDocumentCount()
        console.log(count);
        if (count > 0) return
        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderator' }).save(),
            new Role({ name: 'admin' }).save()
        ])
        console.log(values);
    } catch (error) {
        console.log(error)
    }
}