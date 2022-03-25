'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Authors', [
{
    id: 1,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 1
  },
{
      id: 2,
      author: "World Book, Inc",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 2
    },
{
      id: 3,
      author: "Institute of Medicine",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 3
    },
{
      id: 4,
      author: "Committee on Quality of Health Care in America",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 3
    },
{
      id: 5,
      author: "Alcoholics Anonymous",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 4
    },
{
      id: 6,
      author: "American Library Association",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 5
    },
{
      id: 7,
      author: "Thatcher Wine",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 6
    },
{
      id: 8,
      author: "Elizabeth Lane",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 6
    },
{
      id: 9,
      author: "Jon Courtenay Grimwood",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 7
    },
{
      id: 10,
      author: "Centers for Disease Control and Prevention (CDC)",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 8
    },
{
    id: 11,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 9
  },
{
      id: 12,
      author: "Angela Duckworth",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 10
    },
{
      id: 13,
      author: "Bill W.",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 11
    },
{
      id: 14,
      author: "William Golding",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 12
    },
{
    id: 15,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 13
  },
{
      id: 16,
      author: "Martha S. Jones",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 14
    },
{
      id: 17,
      author: "United Methodist Publishing House",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 15
    },
{
      id: 18,
      author: "Barack Obama",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 16
    },
{
    id: 19,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 17
  },
{
      id: 20,
      author: "Rose M. Spielman",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 18
    },
{
      id: 21,
      author: "William J. Jenkins",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 18
    },
{
      id: 22,
      author: "Marilyn D. Lovett",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 18
    },
{
      id: 23,
      author: "Adam Grant",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 19
    },
{
      id: 24,
      author: "Tom Rath",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 20
    },
{
      id: 25,
      author: "Centers For Disease Control and Pre CDC",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 21
    },
{
      id: 26,
      author: "Nina Parker",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 22
    },
{
      id: 27,
      author: "OpenStax",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 22
    },
{
      id: 28,
      author: "Mark Schneegurt",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 22
    },
{
      id: 29,
      author: "AnhHue Thi Tu",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 22
    },
{
      id: 30,
      author: "Brian M. Forster",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 22
    },
{
      id: 31,
      author: "Philip Lister",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 22
    },
{
      id: 32,
      author: "Landon Mayer",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 23
    },
{
      id: 33,
      author: "FDA",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 24
    },
{
      id: 34,
      author: "U S Food & Drug Administrati",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 24
    },
{
      id: 35,
      author: "Alice Sebold",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 25
    },
{
      id: 36,
      author: "C. G. Jung",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 26
    },
{
      id: 37,
      author: "Sandra Wu",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 27
    },
{
    id: 38,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 28
  },
{
      id: 39,
      author: "Suzanne Berne",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 29
    },
{
      id: 40,
      author: "Carter Higgins",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 30
    },
{
      id: 41,
      author: "Derick Wilder",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 31
    },
{
      id: 42,
      author: "Jon Scieszka",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 32
    },
{
      id: 43,
      author: "Us Congress",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 33
    },
{
      id: 44,
      author: "LucasFilm Ltd.",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 34
    },
{
    id: 45,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 35
  },
{
      id: 46,
      author: "Institute of Medicine",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 36
    },
{
      id: 47,
      author: "National Academy of Engineering",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 36
    },
{
      id: 48,
      author: "National Academy of Sciences",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 36
    },
{
      id: 49,
      author: "Committee on Science, Engineering, and Public Policy",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 36
    },
{
      id: 50,
      author: "Gestalten",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 37
    },
{
      id: 51,
      author: "Marianne Julia Strauss",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 37
    },
{
    id: 52,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 38
  },
{
    id: 53,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 39
  },
{
      id: 54,
      author: "Us Congress",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 40
    },
{
      id: 55,
      author: "Corinna Zeltsman",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 41
    },
{
      id: 56,
      author: "Industry Canada",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 42
    },
{
      id: 57,
      author: "Competition Bureau Canada",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 42
    },
{
      id: 58,
      author: "Niall Richard Murphy",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 43
    },
{
      id: 59,
      author: "Betsy Beyer",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 43
    },
{
      id: 60,
      author: "Chris Jones",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 43
    },
{
      id: 61,
      author: "Jennifer Petoff",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 43
    },
{
      id: 62,
      author: "Lisa Damour, Ph.D.",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 44
    },
{
      id: 63,
      author: "Carlo Collodi",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 45
    },
{
      id: 64,
      author: "Barry Estabrook",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 46
    },
{
      id: 65,
      author: "Betsy Beyer",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 47
    },
{
      id: 66,
      author: "Niall Richard Murphy",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 47
    },
{
      id: 67,
      author: "David K. Rensin",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 47
    },
{
      id: 68,
      author: "Kent Kawahara",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 47
    },
{
      id: 69,
      author: "Stephen Thorne",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 47
    },
{
      id: 70,
      author: "LucasFilm Ltd.",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 48
    },
{
      id: 71,
      author: "Crockett Johnson",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 49
    },
{
      id: 72,
      author: "bell hooks",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 50
    },
{
      id: 73,
      author: "Jonathan Auxier",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 51
    },
{
      id: 74,
      author: "Clover Hope",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 52
    },
{
      id: 75,
      author: "Jen Bryant",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 53
    },
{
      id: 76,
      author: "Netflix",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 54
    },
{
      id: 77,
      author: "Gabrielle Meyer",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 54
    },
{
      id: 78,
      author: "Norah Gaughan",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 55
    },
{
      id: 79,
      author: "Ivan Sergeevich Turgenev",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 56
    },
{
    id: 80,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 57
  },
{
      id: 81,
      author: "Institute of Medicine",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 58
    },
{
      id: 82,
      author: "National Academy of Engineering",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 58
    },
{
      id: 83,
      author: "National Academy of Sciences",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 58
    },
{
      id: 84,
      author: "Committee on Science, Engineering, and Public Policy",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 58
    },
{
      id: 85,
      author: "Gestalten",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 59
    },
{
      id: 86,
      author: "Marianne Julia Strauss",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 59
    },
{
    id: 87,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 60
  },
{
    id: 88,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 61
  },
{
      id: 89,
      author: "Kim Krans",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 62
    },
{
      id: 90,
      author: "Free Minds Writers",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 63
    },
{
      id: 91,
      author: "Mark Walderhaug",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 64
    },
{
      id: 92,
      author: "David L. DiLaura",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 65
    },
{
      id: 93,
      author: "American Medical Association",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 66
    },
{
      id: 94,
      author: "Fred Donini-Lenoff",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 66
    },
{
      id: 95,
      author: "Virginia Woolf",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 67
    },
{
      id: 96,
      author: "Tucker Max",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 68
    },
{
      id: 97,
      author: "Zach Obront",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 68
    },
{
      id: 98,
      author: "Susanna Clarke",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 69
    },
{
    id: 99,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 70
  },
{
    id: 100,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 71
  },
{
      id: 101,
      author: "John Brooks",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 72
    },
{
      id: 102,
      author: "Francisco de la Mora",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 73
    },
{
      id: 103,
      author: "Asia Alfasi",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 74
    },
{
      id: 104,
      author: "Catherine Anyango Grünewald",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 74
    },
{
      id: 105,
      author: "Sonia Leong",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 74
    },
{
      id: 106,
      author: "Woodrow Phoenix",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 74
    },
{
      id: 107,
      author: "Stefan Kornelius",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 75
    },
{
      id: 108,
      author: "VINCE. CABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 76
    },
{
      id: 109,
      author: "Gayle E. Pitman",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 77
    },
{
      id: 110,
      author: "Virginia Woolf",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 78
    },
{
      id: 111,
      author: "American Psychiatric Association",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 79
    },
{
      id: 112,
      author: "Bassem Youssef",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 80
    },
{
      id: 113,
      author: "Catherine R. Daly",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 80
    },
{
      id: 114,
      author: "Scott Chacon",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 81
    },
{
      id: 115,
      author: "United States. Rehabilitation Services Administration. Division of Monitoring and Program Analysis. Statistical Analysis and Systems Branch",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 82
    },
{
      id: 116,
      author: "John Cheever",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 83
    },
{
      id: 117,
      author: "Jordan Morris",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 84
    },
{
      id: 118,
      author: "Virginia Woolf",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 85
    },
{
      id: 119,
      author: "Tucker Max",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 86
    },
{
      id: 120,
      author: "Zach Obront",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 86
    },
{
      id: 121,
      author: "Mark Haddon",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 87
    },
{
      id: 122,
      author: "Jesse Schell",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 88
    },
{
      id: 123,
      author: "Vivek H. Murthy, M.D.",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 89
    },
{
      id: 124,
      author: "Mira Jacob",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 90
    },
{
      id: 125,
      author: "Angela Slavova",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 91
    },
{
      id: 126,
      author: "Tochi Onyebuchi",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 92
    },
{
    id: 127,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 93
  },
{
    id: 128,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 94
  },
{
      id: 129,
      author: "John Brooks",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 95
    },
{
      id: 130,
      author: "Francisco de la Mora",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 96
    },
{
      id: 131,
      author: "Asia Alfasi",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 97
    },
{
      id: 132,
      author: "Catherine Anyango Grünewald",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 97
    },
{
      id: 133,
      author: "Sonia Leong",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 97
    },
{
      id: 134,
      author: "Woodrow Phoenix",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 97
    },
{
      id: 135,
      author: "Stefan Kornelius",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 98
    },
{
      id: 136,
      author: "VINCE. CABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 99
    },
{
      id: 137,
      author: "Gayle E. Pitman",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 100
    },
{
      id: 138,
      author: "Virginia Woolf",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 101
    },
{
      id: 139,
      author: "David Hopen",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 102
    },
{
      id: 140,
      author: "Ben Estes",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 103
    },
{
      id: 141,
      author: "A a",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 104
    },
{
      id: 142,
      author: "Aa World Services Inc",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 104
    },
{
      id: 143,
      author: "American Psychiatric Association",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 105
    },
{
      id: 144,
      author: "Bill Bernstein",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 106
    },
{
      id: 145,
      author: "Michael D. C. Drout",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 107
    },
{
      id: 146,
      author: "Libby Martinez",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 108
    },
{
      id: 147,
      author: "United Methodist Church (U.S.)",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 109
    },
{
      id: 148,
      author: "Deseret Book Company",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 110
    },
{
    id: 149,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 111
  },
{
      id: 150,
      author: "Committee on Nomenclature and Statistics American Psychiatric Association",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 112
    },
{
      id: 151,
      author: "Amy Tan",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 113
    },
{
      id: 152,
      author: "Scholastic",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 114
    },
{
      id: 153,
      author: "Willa Reece",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 115
    },
{
      id: 154,
      author: "Disney Book Group",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 116
    },
{
      id: 155,
      author: "R. Karl Hanson",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 117
    },
{
      id: 156,
      author: "Dr William J Doherty",
      createdAt: new Date(),
      updatedAt: new Date(),
      bookId: 118
    },
{
    id: 157,
    author: 'N/A',
    createdAt: new Date(),
    updatedAt: new Date(),
    bookId: 119
  }
], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Authors', null, {});
     
  }
};
