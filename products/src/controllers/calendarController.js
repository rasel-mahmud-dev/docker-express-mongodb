const Event = require('../models/Event')
// //const User = require('../models/user')
//
// //const Enrollment = require('../models/enrollment')
//
// const CalendarConfig = require('../models/calendarConfig')
// const moment = require('moment')
// const mongoose = require('mongoose')
// const schedule = require('node-schedule');
// const async = require('async');
//
//


exports.allEvents = (req, res) => {
	let status = req.query?.status
	let query = {}
	if (status) {
		query.status = status
	}
	
	Event.find(query)
		.populate("users", "firstName lastName email profilePicture")
		.populate("invitations", "firstName lastName email profilePicture")
		.populate("createdBy", "firstName lastName email profilePicture")
		.sort('-start')
		.then(events => {
			res.status(200).json({ success: true, events })
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({ error: "Something went wrong" })
		})

}


//----------------------------------------------------------------------------------------------------------------



// add meetingLinks and remove description
exports.createEvent = async (req, res) => {
	if (req.user?.parent) {
		return res.status(400).json({ error: "Access denied" })
	}
	const { title, start, end, agenda, actionItems, meetingLink, followUp, attachments, invitations, users } = req.body
	if (!start) {
		return res.status(400).json({ error: "Start time is required" })
	}
	
	let data = {
		title,
		start,
		end,
		agenda,
		actionItems,
		followUp,
		meetingLink,
		status: "pending",
		attachments,
		createdBy: req.user._id,
		invitations: invitations || [],
		users: users || []
	}
	
	let newEvent = new Event(data)
	
	newEvent = await newEvent.save()
	
	
	console.log(newEvent)
	
	// _event.save()
	// 	.then(async event => {
	// 		await event.populate("users", "firstName lastName email profilePicture").execPopulate()
	// 		await event.populate("invitations", "firstName lastName email profilePicture role").execPopulate()
	// 		await event.populate("createdBy", "firstName lastName email profilePicture").execPopulate()
	//
	// 		if (event.invitations.filter(user => user.role === 'master' || user.role === "staff").length > 0) {
	//
	//
	// 			await event.updateOne({ $set: { status: 'accepted' } })
	// 			res.status(200).json({ success: true, event: { ...event._doc, status: "accepted" } })
	//
	// 		} else {
	// 			res.status(200).json({ success: true, event })
	// 		}
	//
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 		res.status(400).json({ error: "Something went wrong" })
	// 	})
	
	
}

//---------------------------------------------------------------------------------------------------------------------
//
// exports.editEvent = (req, res) => {
// 	if (req.user?.parent) {
// 		return res.status(400).json({ error: "Access denied" })
// 	}
// 	let id = req.params.id
// 	const { title, start, end, description, actionItems, followUp, invitations, attachments } = req.body
// 	if (!start) {
// 		return res.status(400).json({ error: "Start time is required" })
// 	}
// 	let data = {
// 		title,
// 		start,
// 		end,
// 		description,
// 		actionItems,
// 		followUp,
// 		invitations,
// 		attachments
// 	}
//
// 	Event.findByIdAndUpdate(id, { $set: data }, { new: true })
// 		.populate("users", "firstName lastName email profilePicture")
// 		.populate("invitations", "firstName lastName email profilePicture")
// 		.populate("createdBy", "firstName lastName email profilePicture")
// 		.then(event => {
// 			res.status(200).json({ success: true, event })
//
// 			let selecteJob = schedule.scheduledJobs[event._id?.toString()]
// 			if (selecteJob) {
// 				selecteJob.cancel()
// 			}
//
// 			let targetDate = moment(start).subtract(30, 'minutes').toISOString()
// 			schedule.scheduleJob(event._id?.toString(), new Date(targetDate), async () => {
// 				runJob({
// 					id: event._id?.toString(),
// 					io: req.io,
// 					redisClient: req?.redisClient
// 				})
// 			});
//
//
//
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(400).json({ error: "Something went wrong" })
// 		})
// }
//
//
// //-------------------------------------------------------------------------------------------------------------------
//
exports.myEvents = (req, res) => {
	// Event.find({ $or: [{ users: req.user._id }, { createdBy: req.user._id }] })
	// 	.populate("users", "firstName lastName email profilePicture")
	// 	.populate("invitations", "firstName lastName email profilePicture")
	// 	.populate("createdBy", "firstName lastName email profilePicture")
	// 	.then(async events => {
	// 		let myInvitations = await Event.find({ invitations: req.user._id })
	// 			.populate("createdBy", "firstName lastName email")
	// 			.sort("-createdAt")
	// 			.exec()
	// 		res.status(200).json({ success: true, events, myInvitations })
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 		res.status(400).json({ error: "Something went wrong" })
	// 	})
}

// //------------------------------------------------------------------------------------------------------------------
//
// exports.updateInvitation = async (req, res) => {
// 	if (req.user?.parent) {
// 		return res.status(400).json({ error: "Access denied" })
// 	}
// 	let { id, type } = req.body
// 	try {
// 		let event = await Event.findById(id).exec()
// 		if (!event) {
// 			return res.status(400).json({ error: "Event not found" })
// 		}
// 		if (type === 'accept') {
// 			if (event?.users === null) {
// 				await event.updateOne({ $set: { users: [] } }).exec()
// 			}
// 			await Event.findByIdAndUpdate(id, { $addToSet: { users: [req.user._id] }, $pull: { invitations: req.user._id } }).exec()
// 			res.status(200).json({ success: true })
//
// 		} else if (type === 'remove') {
// 			if (event?.invitations === null) {
// 				await event.updateOne({ $set: { invitations: [] } }).exec()
// 			}
// 			await Event.findByIdAndUpdate(id, { $pull: { invitations: req.user._id } }).exec()
// 			res.status(200).json({ success: true })
// 		} else {
// 			res.status(400).json({ error: "Invalid data" })
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		res.status(400).json({ error: "Something went wrong" })
// 	}
// }
//
//
// //------------------------------------------------------------------------------------------------------------------
//
//
// exports.filterUser = async (req, res) => {
// 	// let { query, program, session } = req.body
// 	// let queryData = {
// 	//     "$or": [
// 	//         { role: "user" },
// 	//         { role: "master" },
// 	//         { role: "staff" },
// 	//     ]
// 	// }
//
//
// 	// let enrollmentQuery = {}
// 	// if (program) {
// 	//     enrollmentQuery["program"] = program
// 	// }
// 	// if (session) {
// 	//     enrollmentQuery["session"] = session
// 	// }
//
// 	// if (Object.keys(enrollmentQuery).length > 0) {
// 	//     let usersIds = await Enrollment.distinct("user", enrollmentQuery).exec()
// 	//     queryData["_id"] = {
// 	//         "$in": usersIds
// 	//     }
// 	// }
// 	// if (query) {
// 	//     // options.name =new RegExp(query, "i")
// 	//     //queryData.email = { $regex: query, $options: "i" }
//
// 	//     queryData["$or"] = [
// 	//         { "firstName": { $regex: query, $options: "i" } },
// 	//         { "lastName": { $regex: query, $options: "i" } },
// 	//         { "email": { $regex: query, $options: "i" } }
// 	//     ]
// 	// }
//
// 	// let sort = { "createdAt": -1 }
//
// 	// User.find({ ...queryData, _id: { $ne: req.user._id } })
// 	//     .sort(sort)
// 	//     .limit(200)
// 	//     .select("firstName lastName email profilePicture")
// 	//     .then(users => {
// 	//         res.status(200).json({ success: true, users })
// 	//     })
// 	//     .catch(err => {
// 	//         console.log(err);
// 	//         res.status(400).json({ error: "Something went wrong" })
// 	//     })
// }
//
//
//
// //---------------------------------------------------------------------------------------------------------------------
//
// exports.updateEvent = (req, res) => {
// 	if (req.user?.parent) {
// 		return res.status(400).json({ error: "Access denied" })
// 	}
// 	let id = req.params.id
// 	const { title, start, end, description, users, status, actionItems, followUp, attachments, invitations } = req.body
// 	let data = {
// 		title,
// 		start,
// 		end,
// 		description,
// 		status,
// 		actionItems,
// 		followUp,
// 		attachments,
// 		invitations
// 	}
// 	if (status === 'accepted') {
// 		data.organizer = req.user._id
// 	}
// 	Event.findByIdAndUpdate(id, { $set: data }, { new: true })
// 		.populate("users", "firstName lastName email profilePicture")
// 		.populate("invitations", "firstName lastName email profilePicture")
// 		.populate("createdBy", "firstName lastName email profilePicture")
// 		.then(event => {
// 			res.status(200).json({ success: true, event })
//
// 			// let selecteJob = schedule.scheduledJobs[event._id?.toString()]
// 			// if (selecteJob) {
// 			//     selecteJob.cancel()
// 			// }
//
// 			// let targetDate = moment(start).subtract(30, 'minutes').toISOString()
// 			// schedule.scheduleJob(event._id?.toString(), new Date(targetDate), async () => {
// 			//     runJob({
// 			//         id: event._id?.toString(),
// 			//         io: req.io,
// 			//         redisClient: req?.redisClient
// 			//     })
// 			// });
//
//
// 		})
// 		.catch(err => {
//
// 			res.status(400).json({ error: "Something went wrong" })
// 		})
// }
//
// //--------------------------------------------------------------------------------------------------------------------
//
// exports.createAdminEvent = (req, res) => {
// 	const { title, start, end, description, users, status, actionItems, followUp, attachments, invitations } = req.body
// 	let data = {
// 		title,
// 		start,
// 		end,
// 		description,
// 		status,
// 		users,
// 		actionItems,
// 		followUp,
// 		attachments,
// 		invitations,
// 		organizer: req.user._id,
// 		createdBy: req.user._id,
// 	}
//
// 	let io = req.io
// 	let redisClient = req.redisClient
//
// 	let _event = new Event(data)
// 	_event.save()
// 		.then(async event => {
// 			await event.populate('users', 'firstName lastName email profilePicture').execPopulate()
// 			await event.populate('invitations', 'firstName lastName email profilePicture').execPopulate()
// 			await event.populate('createdBy', 'firstName lastName email profilePicture').execPopulate()
// 			res.status(200).json({ success: true, event })
//
// 			// if (users && users.length > 0) {
//
// 			//     for (let index = 0; index < users.length; index++) {
//
// 			//         let noti = await Notification.insertNotification(users[index].toString(), req.user._id, "calender", event.title)
// 			//         io.to(users[index].toString()).emit("newnotification", { notification: noti })
//
//
//
//
// 			//     }
// 			// }
//
//
// 			// let selecteJob = schedule.scheduledJobs[event._id?.toString()]
// 			// if (selecteJob) {
// 			//     selecteJob.cancel()
// 			// }
//
// 			// let targetDate = moment(start).subtract(30, 'minutes').toISOString()
// 			// schedule.scheduleJob(event._id?.toString(), new Date(targetDate), async () => {
// 			//     runJob({
// 			//         id: event._id?.toString(),
// 			//         io: req.io,
// 			//         redisClient: req?.redisClient
// 			//     })
// 			// });
//
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(400).json({ error: "Something went wrong" })
// 		})
//
// }
//
//
//
//
//
//
//
//
//
// //------------------------------------------------------------------------------------------------------------------
//
// exports.createConfig = async (req, res) => {
//
// 	let { name, description } = req.body
// 	try {
// 		let find = await CalendarConfig.findOne({ name }).exec()
// 		if (find) {
// 			return res.status(400).json({ error: "Name already exists" })
// 		}
//
// 		let data = {
// 			name,
// 			description,
// 			createdBy: req.user?._id,
// 			weeksConfig: {
// 				0: {
// 					label: "Sunday",
// 					type: "workingDay",
// 					message: "",
// 					timeRanges: [
// 						{
// 							start: null,
// 							end: null
// 						}
// 					]
// 				},
//
// 				1: {
// 					label: "Monday",
// 					type: "workingDay",
// 					message: "",
// 					timeRanges: [
// 						{
// 							start: null,
// 							end: null
// 						}
// 					]
// 				},
// 				2: {
// 					label: "Tuesday",
// 					type: "workingDay",
// 					message: "",
// 					timeRanges: [
// 						{
// 							start: null,
// 							end: null
// 						}
// 					]
//
// 				},
//
// 				3: {
// 					label: "Wednesday",
// 					type: "workingDay",
// 					message: "",
// 					timeRanges: [
// 						{
// 							start: null,
// 							end: null
// 						}
// 					]
//
// 				},
//
// 				4: {
// 					label: "Thursday",
// 					type: "workingDay",
// 					message: "",
// 					timeRanges: [
// 						{
// 							start: null,
// 							end: null
// 						}
// 					]
//
// 				},
//
// 				5: {
// 					label: "Friday",
// 					type: "holiday",
// 					message: "",
// 					timeRanges: [
// 						{
// 							start: null,
// 							end: null
// 						}
// 					]
//
// 				},
// 				6: {
// 					label: "Saturday",
// 					type: "workingDay",
// 					message: "",
// 					timeRanges: [
// 						{
// 							start: null,
// 							end: null
// 						}
// 					]
// 				}
// 			},
// 		}
//
// 		let _config = new CalendarConfig(data)
//
// 		let config = await _config.save()
//
// 		res.status(201).json({ success: true, config })
//
// 	} catch (error) {
// 		console.log(error);
// 		res.status(400).json({ error: "Something went wrong" })
// 	}
// }
//
//
// //------------------------------------------------------------------------------------------------------------------
//
// exports.updateConfig = async (req, res) => {
// 	let id = req.params.id
// 	if (!id) {
// 		return res.status(400).json({ error: "Id is required" })
// 	}
// 	let {
// 		isDisabledPrev,
// 		disableAfterDate,
// 		weeksConfig,
// 		datesConfig
// 	} = req.body
// 	try {
// 		let find = await CalendarConfig.findById(id).exec()
// 		if (!find) {
// 			return res.status(400).json({ error: "Config not found" })
// 		}
//
// 		let data = {
//
// 			isDisabledPrev,
// 			disableAfterDate,
// 			weeksConfig,
// 			datesConfig
// 		}
//
//
//
// 		let config = await CalendarConfig.findByIdAndUpdate(id, { $set: data }, { new: true })
// 			.exec()
//
// 		res.status(201).json({ success: true, config })
//
// 	} catch (error) {
// 		console.log(error);
// 		res.status(400).json({ error: "Something went wrong" })
// 	}
// }
//
//
//
// exports.deleteConfig = async (req, res) => {
// 	let id = req.params.id
// 	if (!id) {
// 		return res.status(400).json({ error: "Id is required" })
// 	}
//
// 	try {
// 		let find = await CalendarConfig.findById(id).exec()
// 		if (!find) {
// 			return res.status(400).json({ error: "Config not found" })
// 		}
//
//
//
// 		await CalendarConfig.findByIdAndDelete(id)
// 			.exec()
//
// 		res.status(201).json({ success: true })
//
// 	} catch (error) {
// 		console.log(error);
// 		res.status(400).json({ error: "Something went wrong" })
// 	}
// }
//
//
//
//
// exports.getAllConfig = async (req, res) => {
//
//
// 	try {
//
//
// 		let configs = await CalendarConfig.find()
// 			.sort("-createdAt")
// 			.exec()
//
// 		res.status(201).json({ success: true, configs })
//
// 	} catch (error) {
// 		console.log(error);
// 		res.status(400).json({ error: "Something went wrong" })
// 	}
// }
//
//
//
//
// exports.getSingleConfig = async (req, res) => {
//
// 	let id = req.params.id
// 	if (!id) {
// 		return res.status(400).json({ error: "Id is required" })
// 	}
// 	try {
//
//
// 		let find = await CalendarConfig.findById(id).exec()
// 		if (!find) {
// 			return res.status(400).json({ error: "Config not found" })
// 		}
//
// 		res.status(201).json({ success: true, config: find })
//
// 	} catch (error) {
// 		console.log(error);
// 		res.status(400).json({ error: "Something went wrong" })
// 	}
// }
//
//
// exports.getSingleConfigByname = async (req, res) => {
//
// 	let { name } = req.params
// 	if (!name) {
// 		return res.status(400).json({ error: "name is required" })
// 	}
//
// 	try {
//
// 		let find = await CalendarConfig.findOne({ name }).exec()
// 		if (!find) {
// 			return res.status(400).json({ error: "Config not found" })
// 		}
//
// 		res.status(201).json({ success: true, config: find })
//
// 	} catch (error) {
// 		console.log(error);
// 		res.status(400).json({ error: "Something went wrong" })
// 	}
// }