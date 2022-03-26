'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',[

{
      id: 1,
      category: "Military art and science",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 1
    },
{
      id: 2,
      category: "Encyclopedias and dictionaries",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 2
    },
{
      id: 3,
      category: "Medical",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 3
    },
{
    id: 4,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 4
  },
{
      id: 5,
      category: "Libraries",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 5
    },
{
      id: 6,
      category: "House & Home",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 6
    },
{
      id: 7,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 7
    },
{
      id: 8,
      category: "Medical",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 8
    },
{
      id: 9,
      category: "Communicable diseases",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 9
    },
{
      id: 10,
      category: "Self-Help",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 10
    },
{
      id: 11,
      category: "Self-Help",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 11
    },
{
      id: 12,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 12
    },
{
      id: 13,
      category: "Wisconsin",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 13
    },
{
      id: 14,
      category: "History",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 14
    },
{
      id: 15,
      category: "Religion",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 15
    },
{
      id: 16,
      category: "Biography & Autobiography",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 16
    },
{
    id: 17,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 17
  },
{
    id: 18,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 18
  },
{
      id: 19,
      category: "Business & Economics",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 19
    },
{
      id: 20,
      category: "Business & Economics",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 20
    },
{
      id: 21,
      category: "Medical",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 21
    },
{
      id: 22,
      category: "Microbiology",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 22
    },
{
      id: 23,
      category: "Sports & Recreation",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 23
    },
{
      id: 24,
      category: "Medical",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 24
    },
{
      id: 25,
      category: "Biography & Autobiography",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 25
    },
{
      id: 26,
      category: "Psychology",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 26
    },
{
      id: 27,
      category: "Cooking",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 27
    },
{
      id: 28,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 28
    },
{
      id: 29,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 29
    },
{
      id: 30,
      category: "Juvenile Nonfiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 30
    },
{
      id: 31,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 31
    },
{
      id: 32,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 32
    },
{
    id: 33,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 33
  },
{
      id: 34,
      category: "Humor",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 34
    },
{
      id: 35,
      category: "Photography",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 35
    },
{
      id: 36,
      category: "Education",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 36
    },
{
      id: 37,
      category: "Design",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 37
    },
{
    id: 38,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 38
  },
{
      id: 39,
      category: "Health & Fitness",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 39
    },
{
    id: 40,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 40
  },
{
      id: 41,
      category: "History",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 41
    },
{
      id: 42,
      category: "Business & Economics",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 42
    },
{
      id: 43,
      category: "Computers",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 43
    },
{
      id: 44,
      category: "Family & Relationships",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 44
    },
{
      id: 45,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 45
    },
{
      id: 46,
      category: "Political Science",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 46
    },
{
      id: 47,
      category: "Computers",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 47
    },
{
      id: 48,
      category: "Humor",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 48
    },
{
      id: 49,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 49
    },
{
      id: 50,
      category: "Family & Relationships",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 50
    },
{
      id: 51,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 51
    },
{
      id: 52,
      category: "Music",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 52
    },
{
      id: 53,
      category: "Juvenile Nonfiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 53
    },
{
      id: 54,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 54
    },
{
      id: 55,
      category: "Crafts & Hobbies",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 55
    },
{
      id: 56,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 56
    },
{
      id: 57,
      category: "Photography",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 57
    },
{
      id: 58,
      category: "Education",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 58
    },
{
      id: 59,
      category: "Design",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 59
    },
{
    id: 60,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 60
  },
{
      id: 61,
      category: "Health & Fitness",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 61
    },
{
      id: 62,
      category: "Body, Mind & Spirit",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 62
    },
{
    id: 63,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 63
  },
{
      id: 64,
      category: "Medical",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 64
    },
{
      id: 65,
      category: "Science",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 65
    },
{
      id: 66,
      category: "Medical",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 66
    },
{
    id: 67,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 67
  },
{
      id: 68,
      category: "Reference",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 68
    },
{
      id: 69,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 69
    },
{
      id: 70,
      category: "Internal revenue law",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 70
    },
{
    id: 71,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 71
  },
{
      id: 72,
      category: "Business & Economics",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 72
    },
{
    id: 73,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 73
  },
{
    id: 74,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 74
  },
{
      id: 75,
      category: "Biography & Autobiography",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 75
    },
{
    id: 76,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 76
  },
{
      id: 77,
      category: "Gay pride parades",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 77
    },
{
      id: 78,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 78
    },
{
    id: 79,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 79
  },
{
      id: 80,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 80
    },
{
      id: 81,
      category: "Computers",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 81
    },
{
      id: 82,
      category: "Rehabilitation",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 82
    },
{
      id: 83,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 83
    },
{
      id: 84,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 84
    },
{
    id: 85,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 85
  },
{
      id: 86,
      category: "Reference",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 86
    },
{
      id: 87,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 87
    },
{
      id: 88,
      category: "Computers",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 88
    },
{
      id: 89,
      category: "Psychology",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 89
    },
{
      id: 90,
      category: "Biography & Autobiography",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 90
    },
{
      id: 91,
      category: "Business mathematics",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 91
    },
{
      id: 92,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 92
    },
{
      id: 93,
      category: "Internal revenue law",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 93
    },
{
    id: 94,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 94
  },
{
      id: 95,
      category: "Business & Economics",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 95
    },
{
    id: 96,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 96
  },
{
    id: 97,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 97
  },
{
      id: 98,
      category: "Biography & Autobiography",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 98
    },
{
    id: 99,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 99
  },
{
      id: 100,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 100
    },
{
      id: 101,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 101
    },
{
      id: 102,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 102
    },
{
    id: 103,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 103
  },
{
      id: 104,
      category: "Self-Help",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 104
    },
{
    id: 105,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 105
  },
{
    id: 106,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 106
  },
{
      id: 107,
      category: "Audiobooks",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 107
    },
{
      id: 108,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 108
    },
{
    id: 109,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 109
  },
{
    id: 110,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 110
  },
{
      id: 111,
      category: "Child development",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 111
    },
{
    id: 112,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 112
  },
{
      id: 113,
      category: "Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 113
    },
{
      id: 114,
      category: "Juvenile Nonfiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 114
    },
{
    id: 115,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 115
  },
{
      id: 116,
      category: "Juvenile Fiction",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 116
    },
{
      id: 117,
      category: "Psychology",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 117
    },
{
    id: 118,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 118
  },
{
    id: 119,
    category: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 119
  }
    ]);
    
},

async down (queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   */
   await queryInterface.bulkDelete('Categories', null, {});
}
};
