const Campaigns = require("../models/campaign");

const getAll = async () => await Campaigns.find();

const getById = async id => await Campaigns.findById(id);

const create = async campaign => {
  if (await Campaigns.findOne({ campaignName: campaign.campaignName })) {
    throw "This Campaign already exists.";
  }

  campaign.deadline = new Date(campaign.deadline);

  const newCampaign = new Campaigns(campaign);

  return await newCampaign.save();
};

const update = async campaign =>
  await Campaigns.findByIdAndUpdate(campaign.id, campaign, {
    useFindAndModify: false,
    new: true
  });

const _delete = async id => await Campaigns.findOneAndDelete(id, { new: true });

module.exports = {
  getAll,
  getById,
  create,
  update,
  _delete
};