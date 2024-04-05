import { asyncHandler } from './../../../utils/asyncHandelar.js';
import productModel from '../../../DB/models/product.model.js';
import cartModel from '../../../DB/models/cart.model.js';
//add cart
export const addToCart = asyncHandler(async (req, res, next) => {
    const { _id } = req.user
    const { productId, quantity } = req.body
    const cart = await cartModel.findOne({ userId: _id })
    const product = await productModel.findOne({ _id: productId, isDeleted: false, stock: { $gte: quantity } })
    if (!product) {
        return next(new Error(" invalid product id ", { cause: 404 }))
    }
    if (!cart) {
        const data = {
            userId: _id,
            products: [
                {
                    productId: product._id,
                    quantity
                }
            ]
        }
        const newCart = await cartModel.create(data)
        return res.status(201).json({ message: "Done", cart: newCart });
    }
    let exist = false
    for (const product of cart.products) {
        if (product.productId.toString() == productId) {
            product.quantity = quantity
            exist = true
            break;
        }
    }
    if (!exist) {
        const add = await cartModel.findByIdAndUpdate({ _id: cart._id }, {
            $push: {
                products: {
                    productId: product._id,
                    quantity
                }
            }
        }, { new: true })
        return res.status(200).json({ message: "Done", cart: add });
    }
    const add = await cartModel.findByIdAndUpdate({ _id: cart._id },
        { products: cart.products },
        { new: true })
    return res.status(200).json({ message: "Done", cart: add });
});
//update cart
export const deleteFromCart = asyncHandler(async (req, res, next) => {
    const { _id } = req.user
    const cart = await cartModel.findOne({ userId: _id })
    if (!cart) {
        return next(new Error(" cart not found  ", { cause: 404 }))
    }
    const newCart = await cartModel.findByIdAndUpdate({ _id: cart._id },
        {
            $pull: {
                products: {
                    productId: { $in: req.params.productId }
                }
            }
        },
        { new: true })
    return res.status(200).json({ message: "Done", cart: newCart });
}
)
//clear products
export const clearCart = asyncHandler(async (req, res, next) => {
    const { _id } = req.user
    const cart = await cartModel.findOne({ userId: _id })
    if (!cart) {
        return next(new Error(" cart not found  ", { cause: 404 }))
    }
    const newCart = await cartModel.findByIdAndUpdate({ _id: cart._id },
        {
            products: []
        },
        { new: true })
    return res.status(200).json({ message: "Done", cart: newCart });
})
