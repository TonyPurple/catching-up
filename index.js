function Insertion(document,cursorPosition,ot){
  const textInsert = ot.chars;
  const modDoc = document.slice(0, cursorPosition) + textInsert + document.slice(cursorPosition)
  return [modDoc, cursorPosition]
}

function Deletion(document,cursorPosition,ot){
  const deleteCount = ot.count;
  const docLength = document.length;
  if(deleteCount+cursorPosition > docLength){
    return [null,null] 
  }
  const modDoc = document.replace(document.slice(cursorPosition,deleteCount+cursorPosition),'')
  return [modDoc,cursorPosition] 
}

function Skipping(document,cursorPosition,ot){
  const skipCount = ot.count;
  const docLength = document.length;
  if(skipCount + cursorPosition > docLength){
    return[null, null]
  }
  const newPosition = cursorPosition + skipCount;
  return [document,newPosition]
}

function OperationalTransform(document,cursorPosition,ot){
  const operation = ot.op;

  let newDocument, newPosition;
  switch (operation){
    case 'insert': 
      [newDocument, newPosition] = Insertion(document,cursorPosition,ot);
      break;
    case 'delete': 
      [newDocument, newPosition] = Deletion(document,cursorPosition,ot);
      break;
    case 'skip':
      [newDocument, newPosition] = Skipping(document,cursorPosition,ot);
      break;
    default:
      return [document,cursorPosition];                            
  }
  if(newPosition === null){
    return [null,null]
  }else{
    return [newDocument,newPosition]
  }
}

function isValid(stale, latest, otjson) {
  otjson = JSON.parse(otjson)
  let staleCopy = stale;
  let cursorPosition = 0;
  const updateStale = (newCopy) => staleCopy = newCopy;
  const updatePosition = (count) => cursorPosition = cursorPosition + count;
  let isValid = true;
  otjson.forEach((ot) => {
    const [newDocument, newPosition] = OperationalTransform(staleCopy,cursorPosition,ot)
    if(newPosition == null) {
      isValid = false;
    }
  updateStale(newDocument);
  updatePosition(newPosition)
  })
console.log('Output document', staleCopy)
console.log('Ending position', cursorPosition)
return isValid
}

const test = isValid(
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  'Repl.it uses operational transformations.',
  '[{"op": "skip", "count": 40}, {"op": "delete", "count": 47}]'
); // true

const test1 = isValid(
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  'Repl.it uses operational transformations.',
  '[{"op": "skip", "count": 45}, {"op": "delete", "count": 47}]'
); // false, delete past end

const test2 = isValid(
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  'Repl.it uses operational transformations.',
  '[{"op": "skip", "count": 40}, {"op": "delete", "count": 47}, {"op": "skip", "count": 2}]'
); // false, skip past end

const test3 = isValid(
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  'We use operational transformations to keep everyone in a multiplayer repl in sync.',
  '[{"op": "delete", "count": 7}, {"op": "insert", "chars": "We"}, {"op": "skip", "count":4}, {"op": "delete", "count": 1}]'
); // true

const test4 = isValid(
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  'Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.',
  '[]'
); // true

console.log(test)
console.log(test1)
console.log(test2)
console.log(test3)
console.log(test4)