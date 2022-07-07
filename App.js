const fs = require('fs');

class Contenedor {
    constructor(dataFile) {
        this.dataFile = dataFile;
        this.objects = this.readData(this.dataFile) || [];
    }
    //Crea un id
    async generateId() {
        try {
            this.objects = await this.getAll() || [];
            let maxId = this.objects.length;
            this.objects.forEach(product => {
                product.id > maxId ? maxId = product.id : maxId
            })
            return maxId + 1;
        } catch (err) {
            console.log(err);
        }
    }
    //Guarda el objecto
    async save(obj) {
        try {
            const readFile = await this.getAll();
            if (!readFile) {
                obj.id = await this.generateId();
                this.objects.push(obj);
                this.writeData(this.objects);
                return obj.id;
            }
            this.objects = readFile;
            obj.id = await this.generateId();
            this.objects.push(obj);
            this.writeData(this.objects);
            return obj.id;
        } catch (err) {
            console.log(err);
        }
    }
    async getById(id) {
        try {
            this.objects = await this.getAll();
            const obj = this.objects.find(product => product.id === Number(id));
            return obj ? obj : null;
        } catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            const data = await this.readData(this.dataFile);
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    //Elimina el producto
    async deleteById(id) {
        try {
            this.objects = await this.getAll();
            this.objects = this.objects.filter(product => product.id != Number(id));
            this.writeData(this.objects);
        } catch (err) {
            console.log(err);
        }
    }
    async deleteAll() {
        try {
            this.objects = await this.getAll();
            this.objects = [];
            this.writeData(this.objects);
        } catch (err) {
            console.log(err);
        }
    }
    readData(path) {
        const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return data;
    }
    writeData(objects) {
        fs.writeFileSync(this.dataFile, JSON.stringify(objects, null, 2));
    }
}

module.exports = Contenedor;