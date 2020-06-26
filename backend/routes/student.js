const router = require("express").Router();
const Student = require("../models/Student");

router.get("", async (req, res) => {
    const students = await Student.find();
    if (students) {
        console.log(students);
        res.status(200).json({
            status: true,
            message: "Students Data Found",
            data: students,
        });
    } else {
        res.status(404).json({
            status: false,
            message: "Some error happened",
        });
    }
});

router.get("/:id", async (req,res) => {
    const student = await Student.findById(req.params.id);
    if(student) {
        res.status(200).json({
            status: true,
            message: "Student Found",
            data: student
        });
    }
    else {
        res.status(404).json({
            status: false,
            message: "Student Not found",
        });
    }
});

router.post("/create", async (req, res) => {
    console.log(req.body);
    const { name, department, passing_year, email, phone, socials } = req.body;
    const student = Student({
        name,
        department,
        joining_year,
        passing_year,
        email,
        phone,
        socials: socials == null ? [] : socials,
    });
    const find = await Student.findOne({ email });
    if (!find) {
        try {
            const save = student.save();
            res.status(201).json({
                status: true,
                message: "Student created",
            });
        } catch (err) {
            res.status(400).json({
                status: false,
                message: "Unable to create student",
                error: err,
            });
        }
    } else {
        res.status(400).json({
            status: false,
            message: "Student exists",
        });
    }
});

module.exports = router;