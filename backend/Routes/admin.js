import express from "express";
const router = express.Router();

const isAdmin = (req, res, next) => {
    const roles = req.kauth.grant.access_token.content.realm_access.roles;
    if (!roles || !roles.includes("admin")) {
        return res.status(403).send("Brak uprawnień administratora.");
    }
    next();
};

router.get('/adminee', isAdmin, (req, res) => {
    res.status(200).send("Panel admina.");
});

export default router;
