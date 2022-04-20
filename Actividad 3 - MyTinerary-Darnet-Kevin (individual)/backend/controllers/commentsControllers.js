const Itineraries = require("../models/itineraries");

const commentsControllers = {
  addComment: async (req, res) => {
    const { itineraryID, comments } = req.body.comentario;
    console.log(itineraryID, comments);
    const userID = req.user._id;
    try {
      const nuevoComment = await Itineraries.findOneAndUpdate(
        { _id: itineraryID },
        {
          $push: {
            comments: { comment: comments, userID: userID },
          },
        },
        { new: true }
      ).populate("comments.userID", { fullName: 1 });
      res.json({
        success: true,
        response: { nuevoComment },
        message: "gracias por dejarnos tu comentario",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Algo ha salido mal intentalo en unos minutos",
      });
    }
  },

  modifyComment: async (req, res) => {
    /*     console.log(req.body);
     */ const { _id, comments } = req.body.comentario;
    try {
      const modifyComment = await Itineraries.findOneAndUpdate(
        { "comments._id": _id },
        { $set: { "comments.$.comment": comments } },
        { new: true }
      ).populate("comments.userID", { fullname: 1, picture: 1 });
      console.log(modifyComment);
      res.json({
        success: true,
        response: { modifyComment },
        message: "tu commentario se ha modificado",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: true,
        message: "Algo salió mal, intentalo nuevamente",
      });
    }
  },

  deleteComment: async (req, res) => {
    const id = req.params.id;
    try {
      const deleteComment = await Itineraries.findOneAndUpdate(
        { "comments._id": id },
        {
          $pull: {
            comments: {
              _id: id,
            },
          },
        },
        { new: true }
      );
      console.log(deleteComment);
      res.json({
        success: true,
        response: { deleteComment },
        message: "Has eliminado el comentario",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Algo ha salido mal intentalo en unos minutos",
      });
    }
  },
};
module.exports = commentsControllers;
