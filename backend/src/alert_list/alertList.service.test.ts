const { AlertListService } =  require('./alertList.service');


test('return alert list', () => {
    const alertListRepository = jest.fn(() => true);
  
    alertListRepository();
  
    expect(alertListRepository).toHaveReturned();
  });


  