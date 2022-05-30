const express = require("express");
const router = express.Router();
const User = require("../models/user");

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const db = "mongodb+srv://alaa:alaa@cluster0.nk0kr.mongodb.net/test";

mongoose.connect(db, (err) => {
    if (err) {
        console.error("Error" + err);
    } else {
        console.log("Connected to DB");
    }
});

// Middleware
function verifyToken(req, res, next) {
    const authorization = req.headers.authorization;

    console.log("this is ", authorization);
    if (!authorization) {
        return res.status(401).send("Unauthorized Request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
        return res.status(401).send("Unauthorized Request");
    }

    let payload = jwt.verify(token, "secretKey");
    if (!payload) {
        return res.status(401).send("Unauthorized Request");
    }
    req.userId = payload.subject;
    next();
}

router.get("/", (req, res) => {
    res.send("Bonjour, Je suis les APIs");
});

router.post("/register", (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.error(error);
        } else {
            let payload = {
                subject: registeredUser._id,
            };
            let token = jwt.sign(payload, "secretKey", { expiresIn: 600 });
            res.status(200).send({ token });
        }
    });
});

router.post("/login", (req, res) => {
    let userData = req.body;
    // check if email exist in database
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send("Invalid Email");
            } else if (user.password !== userData.password) {
                res.status(401).send("Invalid password");
            } else {
                let payload = {
                    subject: user._id,
                };
                let token = jwt.sign(payload, "secretKey");
                res.status(200).send({ token });
            }
        }
    });
});

router.get("/voitures-americaines", (req, res) => {
    let voituresUSA = [{
            Name: "chevrolet chevelle malibu",
            Cylinders: 8,
            Year: "1970-01-01",
            Origin: "USA",
            Image: "https://bringatrailer.com/wp-content/uploads/2019/10/1970_chevrolet_chevelle_ss_15726423487bebd2b9a60dec12aDSC_6147.jpeg?fit=940%2C627",
        },
        {
            Name: "buick skylark 320",
            Cylinders: 8,
            Year: "1970-01-01",
            Origin: "USA",
            Image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Buick_Skylark_GS_Stage_1_Coupe_1970.jpg"
        },
        {
            Name: "plymouth satellite",
            Cylinders: 8,
            Year: "1970-01-01",
            Origin: "USA",
            Image: "https://cdn.dealeraccelerate.com/ccl/1/2720/69082/790x1024/1970-plymouth-satellite"

        },
        {
            Name: "amc rebel sst",
            Cylinders: 8,
            Year: "1970-01-01",
            Origin: "USA",
            Image: "https://image.jimcdn.com/app/cms/image/transf/none/path/sdf95efb2767b419b/image/i36c8739d7166b12e/version/1475964409/image.jpg"
        },
        {
            Name: "ford torino",
            Cylinders: 8,
            Year: "1970-01-01",
            Origin: "USA",
            Image: "https://www.photoscar.fr/wp-content/uploads/2020/04/Ford-Torino-GT-1970-04.jpg"
        },
        {
            Name: "ford galaxie 500",
            Cylinders: 8,
            Year: "1970-01-01",
            Origin: "USA",
            Image: "https://i.pinimg.com/originals/ba/2d/20/ba2d20f691f384257f192d0273dc7145.png"
        },
        {
            Name: "chevrolet impala",
            Cylinders: 8,
            Year: "1970-01-01",
            Origin: "USA",
            Image: "https://bringatrailer.com/wp-content/uploads/2021/08/1970_chevrolet_impala_163292755985b13218fc5c87C250F6D-0471-40DC-9DF4-C7A09132B4BA.jpeg?fit=940%2C627"
        },
        {
            Name: "plymouth fury iii",
            Cylinders: 8,
            Year: "1970-01-01",
            Origin: "USA",
            Image: "https://live.staticflickr.com/2616/3842345439_b60a534228_b.jpg"
        },
        {
            Name: "pontiac catalina",
            Cylinders: 8,
            Year: "1970-01-01",
            Origin: "USA",
            Image: "https://carsmind.com/cache/image/f2cc358d39e05e47e30a65bb6699414f/acc_p_8decd_1970pontiaccatalinahardtopcoupe.jpg"
        },

        {
            Name: "chrysler lebaron town @ country (sw)",
            Cylinders: 8,
            Year: "1979-01-01",
            Origin: "USA",
            Image: "https://i.pinimg.com/originals/70/14/96/701496216b0f5e0d4bfcbc381bb809aa.jpg"
        },
    ];

    res.json(voituresUSA);
});

router.get("/voitures-japonaises", (req, res) => {
    let voituresJap = [{
            Name: "honda prelude",
            Cylinders: 4,
            Year: "1982-01-01",
            Origin: "Japan",
            Image: "https://bringatrailer.com/wp-content/uploads/2019/04/1982_honda_prelude_1556749000c1c474674751f94108IMG_7335_Fotor.jpg?fit=940%2C550"
        },
        {
            Name: "toyota corolla",
            Cylinders: 4,
            Year: "1982-01-01",
            Origin: "Japan",
            Image: "https://japanesenostalgiccar.com/wordpress/wp-content/uploads/2016/03/57.jpg"
        },
        {
            Name: "datsun 200sx",
            Cylinders: 4,
            Year: "1982-01-01",
            Origin: "Japan",
            Image: "https://cdn1.mecum.com/auctions/fl0121/fl0121-455526/images/unnamed-1609166231257@2x.jpg?1609784759000"
        },
    ];

    res.json(voituresJap);
});

router.get("/nos-offres", verifyToken, (req, res) => {
    let offres = [

        {
            Name: "vw rabbit custom",
            Cylinders: 4,
            Year: "1979-01-01",
            Origin: "Europe",
            Image: "https://i.pinimg.com/originals/c8/64/e5/c864e5a538e64d5247a58e011453406d.jpg",
        },
        {
            Name: "mazda glc deluxe",
            Cylinders: 4,
            Year: "1979-01-01",
            Origin: "Japan",
            Image: "https://www.netcarshow.com/Mazda-323-1979-1600-18.jpg"
        },
        {
            Name: "dodge colt hatchback custom",
            Cylinders: 4,
            Year: "1979-01-01",
            Origin: "USA",
            Image: "https://wikiimg.tojsiabtv.com/wikipedia/commons/thumb/6/68/Plymouth_Champ.jpg/1280px-Plymouth_Champ.jpg"
        },
        {
            Name: "amc spirit dl",
            Cylinders: 4,
            Year: "1979-01-01",
            Origin: "USA",
            Image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/1979_AMC_Spirit_GT_V8_Russet_FR.jpg/1200px-1979_AMC_Spirit_GT_V8_Russet_FR.jpg"
        },
        {
            Name: "mercedes benz 300d",
            Cylinders: 5,
            Year: "1979-01-01",
            Origin: "Europe",
            Image: "https://bringatrailer.com/wp-content/uploads/2019/03/1979_mercedes-benz_300d_155249792408495d565eIMG_0226.jpg?fit=940%2C627"
        },
    ];

    res.json(offres);
});

module.exports = router;