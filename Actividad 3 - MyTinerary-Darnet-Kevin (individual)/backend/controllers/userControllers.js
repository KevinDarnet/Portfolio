const User = require("../models/usersModel");
const crypto = require("crypto"); //NPM CRYPTO
const nodemailer = require("nodemailer"); //NPM NODEMAILER
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendEmail = async (email, uniqueString) => {
  //FUNCION ENCARGADA DE ENVIAR EL EMAIL

  const transporter = nodemailer.createTransport({
    //DEFINIMOS EL TRASPORTE UTILIZANDO NODEMAILER
    host: "smtp.gmail.com", //DEFINIMOS LO PARAMETROS NECESARIOS
    port: 465,
    secure: true,
    auth: {
      user: "testmindhub@gmail.com", //DEFINIMOS LOS DATOS DE AUTORIZACION DE NUESTRO PROVEEDOR DE
      pass: "Kevin123#", //COREO ELECTRONICO, CONFIGURAR CUAENTAS PARA PERMIR EL USO DE APPS
    }, //CONFIGURACIONES DE GMAIL
  });

  // EN ESTA SECCION LOS PARAMETROS DEL MAIL
  let sender = "testmindhub@gmail.com";
  let mailOptions = {
    from: sender, //DE QUIEN
    to: email, //A QUIEN
    subject: "Verificacion de email usuario ", //EL ASUNTO Y EN HTML EL TEMPLATE PARA EL CUERPO DE EMAIL Y EL LINK DE VERIFICACION
    html: `
        <div >
        <h1 style="color:black" >Welcome and thank you for registering on MyTinerary.</h1>
        <h2 style="color:black">Click here <a style="color:blue" href=http://localhost:4000/api/verify/${uniqueString}>aqui</a> to confirm your email.</h2>
        </div>
        `,
  };
  await transporter.sendMail(mailOptions, function (error, response) {
    //SE REALIZA EL ENVIO
    if (error) {
      console.log(error);
    } else {
      console.log("Mensaje enviado");
    }
  });
};

const usersControllers = {
  verifyEmail: async (req, res) => {
    const { uniqueString } = req.params; //EXTRAE EL EL STRING UNICO DEL LINK
    const user = await User.findOne({ uniqueString: uniqueString });
    /* console.log(user); */ //BUSCA AL USUARIO CORRESPONDIENTE AL LINK
    if (user) {
      user.emailVerificado = true; //COLOCA EL CAMPO emailVerified en true
      await user.save();
      res.redirect("http://localhost:3000/"); //REDIRECCIONA AL USUARIO A UNA RUTA DEFINIDA
      //return  res.json({success:true, response:"Su email se ha verificado correctamente"})
    } else {
      res.json({ success: false, response: "Su email no se ha verificado" });
    }
  },
  signUpUsers: async (req, res) => {
    let { fullName, email, password, country, picture, from } =
      req.body.userData;

    try {
      const usuarioExiste = await User.findOne({ email }); //BUSCAR SI EL USUARIO YA EXISTE EN DB
      if (usuarioExiste) {
        if (usuarioExiste.from.indexOf(from) !== -1) {
          /*  console.log(
            "resultado de if " + (usuarioExiste.from.indexOf(from) === 0)
          ); */ //INDEXOF = 0 EL VALOR EXISTE EN EL INDICE EQ A TRUE -1 NO EXITE EQ A FALSE
          res.json({
            success: false,
            from: "signup",
            message:
              "You have already made your SignUp in this way, please SignIn",
          });
        } else {
          const contraseñaHasheada = bcryptjs.hashSync(password, 10);
          usuarioExiste.from.push(from);
          usuarioExiste.password.push(contraseñaHasheada);
          if (from === "form-Signup") {
            //PORSTERIORMENTE AGREGAREMOS LA VERIFICACION DE EMAIL
            await usuarioExiste.save();
            await sendEmail(email, nuevoUsuario.uniqueString);
            res.json({
              success: true,
              from: "signup",
              message:
                "We sent you an email to validate it, please check your box to complete the signUp and add it to your SignIN methods ",
            });
          } else {
            usuarioExiste.save();
            res.json({
              success: true,
              from: "signup",
              message:
                "Agregamos " + from + " a tus medios para realizar signIn",
            });
          }
        }
      } else {
        //SI EL USUARIO NO ESXITE

        const contraseñaHasheada = bcryptjs.hashSync(password, 10); //LO CREA Y ENCRIPTA LA CONTRASEÑA
        /*         console.log(contraseñaHasheada);
         */ // CREA UN NUEVO OBJETO DE PERSONAS CON SU USUARIO Y CONTRASEÑA (YA ENCRIPTADA)
        const nuevoUsuario = await new User({
          fullName,
          email,
          password: [contraseñaHasheada],
          emailVerificado: false,
          country,
          picture,
          uniqueString: crypto.randomBytes(15).toString("hex"),
          from: [from],
        });

        //SE LO ASIGNA AL USUARIO NUEVO
        if (from !== "form-Signup") {
          //SI LA PETICION PROVIENE DE CUENTA GOOGLE
          await nuevoUsuario.save();
          res.json({
            success: true,
            from: "signup",
            message: "Congratulations, your user has been created with " + from,
          }); // AGREGAMOS MENSAJE DE VERIFICACION
        } else {
          //PASAR EMAIL VERIFICADO A FALSE
          //ENVIARLE EL E MAIL PARA VERIFICAR
          await nuevoUsuario.save();
          await sendEmail(email, nuevoUsuario.uniqueString);
          res.json({
            success: true,
            from: "signup",
            message:
              "We sent you an email to validate it, please check your box to complete the signUp ",
          }); // AGREGAMOS MENSAJE DE VERIFICACION
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong try again in a few minutes",
      }); //CAPTURA EL ERROR
    }
  },
  signInUser: async (req, res) => {
    const { email, password, from } = req.body.loggedUser;
    /*     console.log(req.body.loggedUser);
     */ try {
      const usuarioExiste = await User.findOne({ email });
      /*  console.log(from);
      console.log(usuarioExiste.from.indexOf(from)); */

      if (!usuarioExiste) {
        // PRIMERO VERIFICA QUE EL USUARIO EXISTA
        res.json({
          success: false,
          message: "Your users have not been registered signUp",
        });
      } else {
        if (from !== "form-Signup") {
          let contraseñaCoincide = usuarioExiste.password.filter((pass) =>
            bcryptjs.compareSync(password, pass)
          );

          if (contraseñaCoincide.length > 0) {
            const userData = {
              id: usuarioExiste._id,
              fullName: usuarioExiste.fullName,
              email: usuarioExiste.email,
              picture: usuarioExiste.picture,
              from: usuarioExiste.from,
            };
            await usuarioExiste.save();
            const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24,
            });

            res.json({
              success: true,
              from: from,
              response: { token, userData },
              message: "Welcome " + userData.fullName,
            });
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "You have not registered with " +
                from +
                "If you want to enter with this method you must do the signUp with " +
                from,
            });
          }
        } else {
          if (usuarioExiste.emailVerificado) {
            /*             console.log(usuarioExiste.from.indexOf(from));
             */
            let contraseñaCoincide = usuarioExiste.password.filter((pass) =>
              bcryptjs.compareSync(password, pass)
            );

            if (contraseñaCoincide.length > 0) {
              const userData = {
                id: usuarioExiste._id,
                fullName: usuarioExiste.fullName,
                email: usuarioExiste.email,
                picture: usuarioExiste.picture,
                from: usuarioExiste.from,
              };
              const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
                expiresIn: 60 * 60 * 24,
              });
              res.json({
                success: true,
                from: from,
                response: { token, userData },
                message: "Welcome again " + userData.fullName,
              });
            } else {
              res.json({
                success: false,
                from: from,
                message: "The username or password do not match",
              });
            }
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "You have not verified your email, please check your email box to complete your signUp",
            });
          }
        } //SI NO ESTA VERIFICADO
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong try again in a few minutes",
      });
    }
  },
  signOutUser: async (req, res) => {
    const email = req.body.closeuser;
    const user = await User.findOne({ email });
    await user.save();
    res.json(console.log("sesion cerrada " + email));
  },
  verificarToken: (req, res) => {
    /*     console.log(req.user);
     */ if (!req.err) {
      res.json({
        success: true,
        response: {
          id: req.user.id,
          fullName: req.user.fullName,
          email: req.user.email,
          picture: req.user.picture,

          from: "token",
        },
        message: "Welcome again " + req.user.fullName,
      });
    } else {
      res.json({
        success: false,
        message: "Please signIn again",
      });
    }
  },
};
module.exports = usersControllers;
