const config = require("config.json");
const db = require("_helpers/db");
const Campaign = db.Campaign;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};


async function getAll() {
  return await Campaign.find()
}

async function getById(id) {
  return await Campaign.findById(id)
}

async function create(campaignParam) {
  if (await Campaign.findOne({ campaign: campaignParam.campaignName })) {
    throw "Campaign name already exists";
  }

  const campaign = new Campaign(campaignParam);
  if (campaignParam.campaignName) {
    //????  = (campaignParam.campaignName);
  }

  await campaign.save();
}

async function update(id, campaignParam) {
  const campaign = await Campaign.findById(id);

  if (!campaign) throw "Campaign not found";
  if (
    campaign.campaignName !== campaignParam.campaignName &&
    (await Campaign.findOne({ campaignName: campaignParam.campaignName }))
  ) {
    throw "Campaign name is already in use";
  }

  Object.assign(campaign, campaignParam);

  await campaign.save();
}

async function _delete(id) {
  await Campaign.findByIdAndRemove(id);
}
