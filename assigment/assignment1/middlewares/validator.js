export const idValidator = (req, res, next) => {
    const id = req.params.id;
    if (id.length != 24)
        return res
            .status(400)
            .send({ message: " the id must contain 24 letter" });
    else next();
};