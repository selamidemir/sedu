const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

UserSchema.pre('save', function (next) {
  const user = this;
  // Eğer kullanıcının şifresi güncellenmedi
  // farklı özellikleri güncellendi ise geri dön
  if(!user.isModified('password')) return next();

  // Yeni kullanıcı oluşturuldu veya şifre güncellendi
  // ise şifreyi şifrele
  bcrypt.hash(user.password, 10, (error, hash) => {
    if(error) return next(error);
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
