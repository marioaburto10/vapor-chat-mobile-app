import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IRoom extends Document {
  roomName: string;
  password: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const RoomSchema = new Schema<IRoom>(
  {
    roomName: {
      type: String,
      required: [true, 'Room name is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Room name must be at least 3 characters'],
      maxlength: [30, 'Room name cannot exceed 30 characters'],
    },
    password: {
      type: String,
      required: [true, 'Room password is required'],
      minlength: [4, 'Password must be at least 4 characters'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
RoomSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
RoomSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IRoom>('Room', RoomSchema);

