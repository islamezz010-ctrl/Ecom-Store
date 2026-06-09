const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  street: { type: String, required: true },
  building: String,
  cityArea: { type: String, required: true },
  district: String,
  governorate: { type: String, required: true },
  landmark: String,
  addressType: { type: String, enum: ['home', 'office'], default: 'home' },
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });

AddressSchema.index({ user: 1 });

// Ensure only one default address per user
AddressSchema.pre('save', async function (next) {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isDefault: false }
    );
  }
  next();
});

module.exports = mongoose.model('Address', AddressSchema);
