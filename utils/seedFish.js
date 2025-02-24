const mongoose = require('mongoose')
const Fish = require('../models/fish')
const config = require('../utils/config')

const initialFish = [
  {
    name: 'Snapper',
    imageUrl: 'https://res.cloudinary.com/dqc0mub8o/image/upload/v1735679964/Snapper_b6dsvk.jpg',
    description: 'Semi-firm flesh with a low oil content and coarse flakes; excellent for most cooking methods including whole and smoking.',
    MaoriName: 'Tāmure'
  },
  {
    name: 'Blue Cod',
    imageUrl: 'https://res.cloudinary.com/dqc0mub8o/image/upload/v1735679877/Blue-Cod_mly66b.png',
    description: 'Medium-textured white flesh with a low oil content; suitable for most cooking methods.',
    MaoriName: 'Rāwaru'
  }, {
    name: 'Kahawai',
    imageUrl: 'https://res.cloudinary.com/dqc0mub8o/image/upload/v1736024629/Kahawai_jnrxxu.png',
    description: 'Dark, medium-textured flesh that lightens on cooking; suited to canning, where flesh turns a delicate pink, and also smoking.',
    MaoriName: 'Kahawai'
  },
  {
    name: 'John Dory',
    imageUrl: 'https://res.cloudinary.com/dqc0mub8o/image/upload/v1736024359/John-Dory_z2uupp.png',
    description: 'Premium table fish with firm white flesh. Suited to all cooking methods, fillets are boneless and can be eaten skin on or skinless. Medium to firm texture fillets can be boned easily.',
    MaoriName: 'Kuparu'
  },
  {
    name: 'Tarakihi',
    imageUrl: 'https://res.cloudinary.com/dqc0mub8o/image/upload/v1736024360/Tarakihi_t0fwou.png',
    description: 'Medium to firm white flesh with a low to medium oil content; suitable for all methods of cooking. Fillets are skinned and boned or scaled, skin on, pin bone in.',
    MaoriName: 'Tarakihi'
  },
  {
    name: 'Red Gurnard',
    imageUrl: 'https://res.cloudinary.com/dqc0mub8o/image/upload/v1736024359/Red-Gurnard_og2n5f.png',
    description: 'Succulent, medium-textured flesh with low oil content. Suitable for most cooking methods.',
    MaoriName: 'Kumukumu'
  },
  {
    name: 'Kingfish',
    imageUrl: 'https://res.cloudinary.com/dqc0mub8o/image/upload/v1736024359/Kingfish_kuzg42.png',
    description: 'Firm, succulent flesh with a low oil content that can be improved by bleeding after capture; the dark flesh lightens on cooking.',
    MaoriName: 'Haku'
  },
  {
    name: 'Trevally',
    imageUrl: 'https://res.cloudinary.com/dqc0mub8o/image/upload/v1736024359/Trevally_ljka5s.png',
    description: 'Medium to soft with a low oil content; marbled pink flesh with a darker fat line that can be filleted out; excellent smoked. Premium flesh for Sashimi (raw fish) and marinating.',
    MaoriName: 'Araara'
  },
  {
    name: 'Groper',
    imageUrl: 'https://res.cloudinary.com/dqc0mub8o/image/upload/v1736024360/Groper_xj9vhx.png',
    description: 'Firm, lean, white flesh with few bones; remains moist with heavy flakes when cooked; makes good steaks; smokes well; has excellent roe.',
    MaoriName: 'Hāpuku'
  },
]

const seedFish = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL)
    console.log('Connected to MongoDB')

    // clear existing fish data
    await Fish.deleteMany({})
    console.log('Cleared existing fish data')

    // Insert fish data
    await Fish.insertMany(initialFish)
    console.log('Successfully seeded fish data')

    mongoose.connection.close()
  } catch (error) {
    console.error('Error seeding data:', error)
    mongoose.connection.close()
  }
}

seedFish()