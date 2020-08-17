const Company = require('../models/Company');
const Product = require('../models/Product');
const User = require('../models/User');
const Worker = require('../models/Worker');

module.exports = {
    get: {
        add(req, res) {
            const user = req.user;

            res.render('company/add', { user, error: '' });
        },

        async all(req, res) {
            const user = req.user;
            
            const companies = await Company.find();

            res.render('company/all', { user, error: '', companies });
        },

        async byUserId(req, res) {
            const user = req.user;

            const companies = await Company.find({ ownerId: user.id });

            res.render('company/my', { user, error: '', companies });
        },

        async byId(req, res) {
            const user = req.user;
            const { id } = req.params;
            
            const company = await Company.findOne({ _id: id });
            const owner = await User.findOne({ _id: company.ownerId });
            
            const isMyCompany = company.ownerId == user.id;
            const isCandidated = company.candidates.filter(u => u.userId == user.id).length > 0 ? true : false;
            
            res.render('company/details', { user, error: '', company, isMyCompany, owner, isCandidated });
        },
        
        async edit(req, res) {
            const user = req.user;
            const { id } = req.params;
            
            const company = await Company.findOne({ _id: id });

            res.render(`company/edit`, { error: '', user, company });
        },

        async deleteById(req, res) {
            const { id } = req.params;
            const user = req.user;

            const company = await Company.findOne({ _id: id });

            const workers = await Worker.find({ companyId: id });

            res.render('company/delete', { company, user, workers });
        },

        async candidations(req, res) {
            const { id } = req.params;
            const user = req.user;
            
            const company = await Company.findOne({ _id: id });

            res.render('company/candidations', { user, company });
        },

        async allWorkers(req, res) {
            const user = req.user;
            const { id } = req.params;

            try {
                const workers = await Worker.find({ companyId: id });
                res.render('company/allWorkers', { user, workers, id });
            } catch(err) {
                console.log(err);
            }
        },

        async companyWorks(req, res) {
            const user = req.user;
            
            const worker = await Worker.findOne({ userId: user.id });
            const company = await Company.findOne({ _id: worker.companyId });
            const products = await Product.find({ companyId: company.id });

            res.render('company/companyWorks', { user, company, products });
        }
    },

    post: {
        async add(req, res) {
            const user = req.user;
            const { name, imageUrl, phoneNumber, description } = req.body;
            
            if(!user) {
                return res.redirect('/');
            }
            
            try {
                await Company.create({
                    name,
                    imageUrl,
                    phoneNumber,
                    ownerId: req.user.id,
                    description: description
                });
                
                await User.findByIdAndUpdate(user.id, {
                    claim: process.env.BOSS_CLAIM
                });

                req.flash('success', 'This user was created successfully!');
                res.redirect('/company/my');
            } catch(err) {
                res.render('company/add', { user, error: 'Please fill all fields!' });
            }
        },

        async edit(req, res) {
            const user = req.user;
            const { id } = req.params;
            const { name, phoneNumber, imageUrl, description } = req.body;
    
            try {
                const company = await Company.findOne({ _id: id, ownerId: user.id });
                
                if(company.ownerId != user.id) {
                    return res.redirect('/');
                }

                await Company.findByIdAndUpdate(id, {
                    name,
                    phoneNumber,
                    imageUrl,
                    description
                });
    
                req.flash('success', 'This user was updated successfully!');
                res.redirect(`/company/${id}`);
            } catch(err) {
                console.log(err);
            }
        },

        async addWorker(req, res) {
            const { id } = req.params;
            const data = req.body;

            try {
                const isWorker = await Worker.findOne({ userId: data.userId });

                if(isWorker) {
                    req.flash('error', 'This user already works in any company!');
                    return res.redirect('/company/candidations/' + id);
                }
                
                await Worker.create({
                    userId: data.userId,
                    companyId: id,
                    fullName: `${data.firstName} ${data.sirName} ${data.lastName}`,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    city: data.city,
                });
    
                await Company.updateOne(
                        { _id: id }, { $pull: { candidates: { email: data.email }}});
    
                await User.updateOne({ email: data.email }, {
                    $set: { claim: 'worker' } 
                });
            } catch(err) {
                console.log(err);
            }

            req.flash('success', ` The user (${data.firstName} ${data.sirName} ${data.lastName}) was added successfully!`);
            res.redirect(`/company/candidations/${id}`);
        }
    },

    delete: {
        async byId(req, res) {
            const { id } = req.params;
            const user = req.user;

            if(!user) {
                return res.redirect('/');
            }

            const company = await Company.findOne({ _id: id });
            const isMyCompany = company.ownerId == user.id;

            if(isMyCompany) {
                await Product.deleteMany({ companyId: company._id });

                const users = await Worker.find({ companyId: id });
                await Worker.deleteMany({ companyId: id });

                if(users.length > 0) {
                    var ids = [];

                    users.forEach(user => {
                        ids.push({ _id: user.userId });
                    });

                    await User.updateMany({ $or: ids }, {
                        $set: { claim: null }
                    });
                }

                await Company.findByIdAndDelete(id);

                const isUserCompanies = await Company.findOne({ ownerId: user.id });
                
                if(!isUserCompanies) {
                    await User.updateOne({ _id: user.id }, {
                        $set: { claim: null }
                    });
                }

                req.flash('success', 'This company was deleted successfully!');
                return res.redirect('/company/my');
            }

            res.redirect('/');
        },

        async dismissWorker(req, res) {
            const { id } = req.params;
            const data = req.body;

            try {
                await Company.updateOne(
                    { _id: id }, { $pull: { candidates: { email: data.email }}});
                await User.updateOne({ email: data.email }, { $set: { claim: null }});
            } catch(err) {
                console.log(err);
            }

            req.flash('success', 'This user was deleted successfully!');
            res.redirect(`/company/candidations/${id}`);
        },

        async removeWorker(req, res) {
            const { companyId, workerId } = req.body;

            const removedWorker = await Worker.findByIdAndDelete(workerId);
            await User.updateOne({ _id: removedWorker.userId }, { $set: { claim: null }});

            req.flash('success', 'This user was deleted successfully!');
            res.redirect(`/company/allWorkers/${companyId}`);
        }
    }
}