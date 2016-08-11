const data = {
  items: [
    {
      status: 'NEW',
      product: {
        code: 'cake_code',
        name: 'Truffel Boltaart',
        description: 'Chocolade mousse en biscuitdeeg gevuld met koffierumsaus en feuilletine, overgoten met pure chocoladegelei en gegarneerd met een krul van pure chocolade en chocoladegalletjes.',
        price: 17.95,
        imageUrl: 'https://www.debijenkorf.nl/INTERSHOP/static/WFS/dbk-Site/shop/dbk-shop/nl_NL/Statische%20content/filialenservices/horecafood/truffel_boltaart-166_.jpg',
      },
      quantity: 1,
      customer: {
        id: '0005151',
        email: 'john@email.nl',
        name: 'John Doe',
        phoneNumber: '+3161234567',
      },
      pickingOrder: {
        id: '000000000A',
        status: 'INPROGRESS',
        assignee: {
          id: '91201009018418017202204031',
          name: 'Employee name',
        },
      },
      order: {
        id: '0000000001',
        placedAt: '2016-08-05',
        status: 'ACCEPTED',
      },
    },
    {
      status: 'NEW',
      product: {
        code: 'cake_code2',
        name: 'Aardbeien Boltaart',
        description: 'Biscuitdeeg met aardbeienbavaroise, afgemaakt met aardbeiengelei en chocoladegalletjes.',
        price: 17.95,
        imageUrl: 'https://www.debijenkorf.nl/INTERSHOP/static/WFS/dbk-Site/shop/dbk-shop/nl_NL/Statische%20content/filialenservices/horecafood/aardbeien_taart-166.jpg',
      },
      quantity: 1,
      customer: {
        id: '0005152',
        email: 'alan@email.nl',
        name: 'Alan Ford',
        phoneNumber: '+3167654321',
      },
      pickingOrder: {
        id: '000000000B',
        status: 'INPROGRESS',
        assignee: {
          id: '91201009018418017202204031',
          name: 'Employee name',
        },
      },
      order: {
        id: '0000000002',
        placedAt: '2016-08-05',
        status: 'ACCEPTED',
      },
    },
    {
      status: 'NEW',
      product: {
        code: 'cake_code3',
        name: 'Hazelnootschuim Taart',
        description: 'Zachte roombotercrème, hazelnootpaté en room, tussen luchtig hazelnootschuim en met krokante hazelnootstukjes. ',
        price: 13.95,
        imageUrl: 'https://www.debijenkorf.nl/INTERSHOP/static/WFS/dbk-Site/shop/dbk-shop/nl_NL/Statische%20content/Food/hazelnoot-v2-230.jpg',
      },
      quantity: 1,
      customer: {
        id: '0005152',
        email: 'alan@email.nl',
        name: 'Alan Ford',
        phoneNumber: '+3167654321',
      },
      pickingOrder: {
        id: '000000000B',
        status: 'INPROGRESS',
        assignee: {
          id: '91201009018418017202204031',
          name: 'Employee name',
        },
      },
      order: {
        id: '0000000002',
        placedAt: '2016-08-05',
        status: 'ACCEPTED',
      },
    },
  ],
};

export default data;
