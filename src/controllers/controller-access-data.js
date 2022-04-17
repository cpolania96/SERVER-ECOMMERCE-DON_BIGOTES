import fs from 'fs'

class AccessData {
    constructor(archivo) {
        this.archivo = archivo
    }
    async readFile() {
        try {
            const contenido = await fs.promises.readFile(this.archivo, 'utf-8')
            return (
                JSON.parse(contenido))
        } catch (error) {
            console.log(error);
        }
    };

    async save(producto) {
        try {
            let contenido = await this.readFile()
            if (contenido.length === 0) {
                producto.id = 1
            } else {
                producto.id = contenido[contenido.length - 1].id + 1
            }
            contenido.push(producto)
            await fs.promises.writeFile(this.archivo, JSON.stringify(contenido))
        } catch (error) {
            console.log(error)
        }
    }
    async getById(id) {
        try {
            let contenido = await this.readFile()
            const findById = () => contenido.find(cont => cont.id === id)
            return findById()
        } catch (error) {
            error
        }
    }
    async getAll() {
        try {
            let contenido = await this.readFile()
            return contenido
        } catch (error) {
            error
        }
    }
    async deleteById(id) {
        try {
            let contenido = await this.readFile()
            const borrarPorId = contenido.filter(cont => cont.id !== id)
            await fs.promises.writeFile(this.archivo, JSON.stringify(borrarPorId))
            console.log("El objeto fue borrado");
        } catch (error) {
            error
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archivo, "[]")
            console.log('Contenido borrado');
        } catch (error) {
            console.log(error);
        }
    }
    async productRandom() {
        try {
            let contenido = await this.readFile()
            let random = contenido[Math.floor(Math.random() * contenido.length)]
            return random
        } catch (error) {
            error
        }
    }
}

export default AccessData







