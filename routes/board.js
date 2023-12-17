const router = require("express").Router();
const passport = require("passport");
const UserModel=require('../schemas/user.schema.js');


router.get("/api/getBoards", async (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user.id)
        const user = await UserModel.findOne({ userid: req.user.id });
        res.status(200).json({
            boards: user.boards.map((data) =>{ return {"id":data.id, "name":data.name}})
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Please log in",
        });
    }
});

router.get("/api/createBoard/:boardname", async (req, res) => {
    if (req.isAuthenticated()) {
        let user = await UserModel.findOne({ userid: req.user.id });
        const boardName = req.params.boardname;
        user.boards.push({
            name: boardName,
            tasks:[],
            boardList:[]
        })
        user.save()
        res.status(200).json({
            message: "done"
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Please log in",
        });
    }
});


router.get("/api/addTask/:boardId/:taskname/:listname", async (req, res) => {
    if (req.isAuthenticated()) {
        const user = await UserModel.findOne({userid: req.user.id})
        const boardId = req.params.boardId;
        const taskName = req.params.taskname;
        const listName = req.params.listname;

        const foundBoard = user.boards.find(board => board.id === boardId);
        if (foundBoard) {
            const listNameInList = foundBoard.boardList.find(name => name == listName)
            if(!listNameInList){
                foundBoard.boardList.push(listName)
            }
            console.log("Found board:", foundBoard);
            const newTask = {
                task: taskName,
                list: listName,
            }
            foundBoard.tasks.push(newTask);
            user.save()

        } else {
            console.log("Board not found");
        }
        res.status(200).json({
            message: "Task added successfully"
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Please log in",
        });
    }
});

router.get("/api/getTasks/:boardId", async (req, res) => {
    if (req.isAuthenticated()) {
        let user = await UserModel.findOne({ userid: req.user.id });
        const boardId = req.params.boardId;


        const foundBoard = user.boards.find(board => board.id === boardId);
        if (foundBoard) {
            console.log("Found board:", foundBoard);
 

        } else {
            console.log("Board not found");
        }
        res.status(200).json({
            board:foundBoard,
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Please log in",
        });
    }
});

module.exports = router
