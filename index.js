let onTouch = false;
const COUNT = 7;
const CAN_DRAG_CLASS = 'js-canOnDrag';

let selected = [];

function resetData() {
  $(`.${CAN_DRAG_CLASS}`).removeClass('is-active');
  selected = [];
  console.log('reset');
}

const defaultDom = `
<table class="table"><thead></thead><tbody></tbody></table>
`;

function initView(startDate) {
  let dom = $(defaultDom);
  const date = {
    month: startDate.split('/')[0],
    day: startDate.split('/')[1]
  };


  dom.find('thead').append('<tr>');
  for (let i = 0; i < COUNT + 1; i++) {
    if (i === 0) {
      dom.find('thead > tr').append($('<td>').addClass('table-cell'));
      continue;
    }

    dom.find('thead > tr').append($(`<td class="table-cell">${date.month}/${date.day + i}</td>`));
  }

  for (let ii = 0; ii < 24; ii++) {
    let $add = $('<tr>');
    for (let iii = 0; iii < COUNT + 1; iii++) {
      if (iii === 0) {
        $add.append($('<td>').addClass('table-cell table-cell_time').text(`${ii} - ${ii + 1}`));
      } else {
        $add.append($('<td>').addClass('table-cell js-canOnDrag').attr('data-month', date.month).attr('data-day', date.day = iii).attr('id', `${ii}-${iii}`));
      }
    }
    // console.log($add.prop('outerHTML'));
    dom.find('tbody').append($add);
  }

  $('.calender').html(dom.prop('outerHTML'));
}

function showUpdate() {
  const minRow = selected.reduce((id, current) => Math.min(id, current.row), 25);
  const maxRow = selected.reduce((id, current) => Math.max(id, current.row), -1);
  const minCol = selected.reduce((id, current) => Math.min(id, current.col), 25);
  const maxCol = selected.reduce((id, current) => Math.max(id, current.col), -1);

  console.log(minRow, maxRow, minCol, maxCol);
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      $(`#${row}-${col}`).addClass('is-active');
    }
  }
}

$(function () {
  initView('3/1');

  $('body').on('mousedown', ()=> {
    resetData();
    console.log('mouse down')
  });

  $('body').on('mouseup', ()=> {
    onTouch = false;
    console.log('mouse up')
  });

  $('body').on('dragstart', (e)=> {
    e.preventDefault();
  });

  $('.table').on('mousedown', ()=> {
    onTouch = true;
    resetData();
    console.log('table click');
  });

  $(`.${CAN_DRAG_CLASS}`).on('mouseenter', (e)=> {
    if (!onTouch) return;

    $(e.target).addClass('is-active');
    selected.push({
      row: $(e.target).attr('id').split('-')[0],
      col: $(e.target).attr('id').split('-')[1]
    });
    showUpdate();
    console.log(selected);
  });

  $(`.${CAN_DRAG_CLASS}`).on('mousedown', (e)=> {
    $(e.target).addClass('is-active');
  });


});