const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    return await getProduct(id);
}

async function create(params) {
    // validate
    if (await db.Product.findOne({ where: { name: params.name } })) {
        throw 'Product  "' + params.name + '" is already taken';
    }

    // save user
    await db.Product.create(params);
}

async function update(id, params) {
    const product = await getProduct(id);

    // validate
    const productNameChanged = params.name && product.name !== params.name;
    if (productNameChanged && await db.Product.findOne({ where: { username: params.username } })) {
        throw 'Product  "' + params.name + '" is already taken';
    }


    // copy params to user and save
    Object.assign(product, params);
    await product.save();

    return product;
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
}

// // helper functions

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Product not found';
    return product;
}
