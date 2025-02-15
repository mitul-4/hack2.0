import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  image: String,
  emailVerified: Date,
  dietaryPreferences: [{
    type: String,
    createdAt: { type: Date, default: Date.now }
  }],
  accounts: [{
    provider: String,
    providerAccountId: String,
    type: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    id_token: String,
    scope: String
  }],
  sessions: [{
    sessionToken: { type: String, unique: true },
    expires: Date
  }]
}, {
  timestamps: true
});

// Ensure indexes
UserSchema.index({ 'accounts.provider': 1, 'accounts.providerAccountId': 1 });
UserSchema.index({ 'sessions.sessionToken': 1 });

export const User = mongoose.models.User || mongoose.model('User', UserSchema); 