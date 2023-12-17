const router = require("express").Router();
const passport = require("passport");
let mongoose = require('mongoose');
const myDB = mongoose.connection.useDb('projecttracker');

const getUser = async (req) => {
    const usercollection = myDB.collection("usermodels");
    const user = await usercollection.findOne({ userid: req.user.id });
    return user
}

router.get("/api/getBoards", async (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user.id)
        const user = await getUser(req);
        res.status(200).json({
            boards: user.boards.map((data) => data.id)
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Please log in",
        });
    }
});


router.get("/api/getTask/:boardId", async (req, res) => {
    if (req.isAuthenticated()) {
        const user = await getUser(req);
        const boardId = req.params.boardId;
        const foundBoard = user.boards.find(board => board.id === boardId);
        if (foundBoard) {
        console.log("Found board:", foundBoard);
        } else {
        console.log("Board not found");
        }
        res.status(200).json({
            tasks: foundBoard.tasks
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Please log in",
        });
    }
});


module.exports = router
