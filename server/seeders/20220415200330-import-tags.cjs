'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
      await queryInterface.bulkInsert('Tags', [
      {
          id: 10,
          tagname: "Self-Help"
        },
      {
          id: 2,
          tagname: "NOT_MATURE"
        },
      {
          id: 11,
          tagname: "Wisconsin"
        },
      {
          id: 12,
          tagname: "History"
        },
      {
          id: 21,
          tagname: "Juvenile Nonfiction"
        },
      {
          id: 22,
          tagname: "Humor"
        },
      {
          id: 32,
          tagname: "Body, Mind & Spirit"
        },
      {
          id: 33,
          tagname: "Science"
        },
      {
          id: 30,
          tagname: "Music"
        },
      {
          id: 23,
          tagname: "Photography"
        },
      {
          id: 28,
          tagname: "Family & Relationships"
        },
      {
          id: 39,
          tagname: "Audiobooks"
        },
      {
          id: 7,
          tagname: "House & Home"
        },
      {
          id: 38,
          tagname: "Business mathematics"
        },
      {
          id: 17,
          tagname: "Sports & Recreation"
        },
      {
          id: 13,
          tagname: "Religion"
        },
      {
          id: 15,
          tagname: "Business & Economics"
        },
      {
          id: 16,
          tagname: "Microbiology"
        },
      {
          id: 14,
          tagname: "Biography & Autobiography"
        },
      {
          id: 9,
          tagname: "Communicable diseases"
        },
      {
          id: 8,
          tagname: "Fiction"
        },
      {
          id: 4,
          tagname: "Encyclopedias and dictionaries"
        },
      {
          id: 29,
          tagname: "Political Science"
        },
      {
          id: 36,
          tagname: "Gay pride parades"
        },
      {
          id: 31,
          tagname: "Crafts & Hobbies"
        },
      {
          id: 40,
          tagname: "Child development"
        },
      {
          id: 25,
          tagname: "Design"
        },
      {
          id: 19,
          tagname: "Cooking"
        },
      {
          id: 24,
          tagname: "Education"
        },
      {
          id: 5,
          tagname: "Medical"
        },
      {
          id: 6,
          tagname: "Libraries"
        },
      {
          id: 20,
          tagname: "Juvenile Fiction"
        },
      {
          id: 3,
          tagname: "en"
        },
      {
          id: 27,
          tagname: "Computers"
        },
      {
          id: 18,
          tagname: "Psychology"
        },
      {
          id: 37,
          tagname: "Rehabilitation"
        },
      {
          id: 26,
          tagname: "Health & Fitness"
        },
      {
          id: 34,
          tagname: "Reference"
        },
      {
          id: 35,
          tagname: "Internal revenue law"
        },
      {
          id: 1,
          tagname: "Military art and science"
        },
        ], {});
    
},

async down (queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   */
   await queryInterface.bulkDelete('Tags', null, {}); 
  }
};

