var board = {
    1  : "a8", 2  : "b8", 3  : "c8", 4  : "d8", 5  : "e8", 6  : "f8", 7  : "g8", 8  : "h8", 
    9  : "a7", 10 : "b7", 11 : "c7", 12 : "d7", 13 : "e7", 14 : "f7", 15 : "g7", 16 : "h7", 
    17 : "a6", 18 : "b6", 19 : "c6", 20 : "d6", 21 : "e6", 22 : "f6", 23 : "g6", 24 : "h6", 
    25 : "a5", 26 : "b5", 27 : "c5", 28 : "d5", 29 : "e5", 30 : "f5", 31 : "g5", 32 : "h5", 
    33 : "a4", 34 : "b4", 35 : "c4", 36 : "d4", 37 : "e4", 38 : "f4", 39 : "g4", 40 : "h4", 
    41 : "a3", 42 : "b3", 43 : "c3", 44 : "d3", 45 : "e3", 46 : "f3", 47 : "g3", 48 : "h3", 
    49 : "a2", 50 : "b2", 51 : "c2", 52 : "d2", 53 : "e2", 54 : "f2", 55 : "g2", 56 : "h2", 
    57 : "a1", 58 : "b1", 59 : "c1", 60 : "d1", 61 : "e1", 62 : "f1", 63 : "g1", 64 : "h1"
}

var occupied = {
    a8 : {colour: "black"}, b8 : {colour: "black"}, c8 : {colour: "black"}, d8 : {colour: "black"}, e8 : {colour: "black"}, f8 : {colour: "black"}, g8 : {colour: "black"}, h8 : {colour: "black"},
    a7 : {colour: "black"}, b7 : {colour: "black"}, c7 : {colour: "black"}, d7 : {colour: "black"}, e7 : {colour: "black"}, f7 : {colour: "black"}, g7 : {colour: "black"}, h7 : {colour: "black"},
    a6 : {colour: "none"},  b6 : {colour: "none"},  c6 : {colour: "none"},  d6 : {colour: "none"},  e6 : {colour: "none"},  f6 : {colour: "none"},  g6 : {colour: "none"},  h6 : {colour: "none"},
    a5 : {colour: "none"},  b5 : {colour: "none"},  c5 : {colour: "none"},  d5 : {colour: "none"},  e5 : {colour: "none"},  f5 : {colour: "none"},  g5 : {colour: "none"},  h5 : {colour: "none"},
    a4 : {colour: "none"},  b4 : {colour: "none"},  c4 : {colour: "none"},  d4 : {colour: "none"},  e4 : {colour: "none"},  f4 : {colour: "none"},  g4 : {colour: "none"},  h4 : {colour: "none"},
    a3 : {colour: "none"},  b3 : {colour: "none"},  c3 : {colour: "none"},  d3 : {colour: "none"},  e3 : {colour: "none"},  f3 : {colour: "none"},  g3 : {colour: "none"},  h3 : {colour: "none"},
    a2 : {colour: "white"}, b2 : {colour: "white"}, c2 : {colour: "white"}, d2 : {colour: "white"}, e2 : {colour: "white"}, f2 : {colour: "white"}, g2 : {colour: "white"}, h2 : {colour: "white"},
    a1 : {colour: "white"}, b1 : {colour: "white"}, c1 : {colour: "white"}, d1 : {colour: "white"}, e1 : {colour: "white"}, f1 : {colour: "white"}, g1 : {colour: "white"}, h1 : {colour: "white"},
}

const legalMove = (piece, colour, file, rank) => {
    var legalPositions = []
    var capture = []
    var ans = []
    var fileC = file.charCodeAt(0)
    if(piece === "pawn"){
        if(colour === "white"){ 
            if(rank === "2"){
                legalPositions.push(file+(parseInt(rank)+1), file+(parseInt(rank)+2))
            }else if(occupied[file+(parseInt(rank)+1)].colour === "none"){
                legalPositions.push(file+(parseInt(rank)+1))
            }
            if(fileC-1 >= 97){
                if(occupied[String.fromCharCode(fileC-1)+(parseInt(rank)+1)].colour === "black"){
                    capture.push(String.fromCharCode(fileC-1)+(parseInt(rank)+1))
                }
            }
            if(fileC+1 <= 104){
                if(occupied[String.fromCharCode(fileC+1)+(parseInt(rank)+1)].colour === "black"){
                    capture.push(String.fromCharCode(fileC+1)+(parseInt(rank)+1))
                }
            }
        }else if(colour === "black"){
            if(rank === "7"){
                legalPositions.push(file+(parseInt(rank)-1), file+(parseInt(rank)-2))
            }else if(occupied[file+(parseInt(rank)-1)].colour === "none"){
                legalPositions.push(file+(parseInt(rank)-1))
            }
            if(fileC-1 >= 97){
                if(occupied[String.fromCharCode(fileC-1)+(parseInt(rank)-1)].colour === "white"){
                    capture.push(String.fromCharCode(fileC-1)+(parseInt(rank)-1))
                }
            }
            if(fileC+1 <= 104){
                if(occupied[String.fromCharCode(fileC+1)+(parseInt(rank)-1)].colour === "white"){
                    capture.push(String.fromCharCode(fileC+1)+(parseInt(rank)-1))
                }
            }
        }
        ans.push(legalPositions, capture)
        return ans
    }else if(piece === "rook"){
        var up = parseInt(rank)+1
        while(up<=8){
            if(occupied[file+up].colour === "none"){
                legalPositions.push(file+up)
                up=up+1
            }else if(occupied[file+up].colour != colour){
                capture.push(file+up)
                break
            }else{
                break
            }
        }
        var down = parseInt(rank)-1
        while(down>0){
            if(occupied[file+down].colour === "none"){
                legalPositions.push(file+down)
                down=down-1
            }else if(occupied[file+down].colour != colour){
                capture.push(file+down)
                down=down-1
                break
            }else{
                break
            }
        }
        var right = file.charCodeAt(0)+1
        // 97 -> 104
        while(right<=104){
            if(occupied[String.fromCharCode(right)+rank].colour === "none"){
                legalPositions.push(String.fromCharCode(right)+rank)
                right=right+1
            }else if(occupied[String.fromCharCode(right)+rank].colour != colour){
                capture.push(String.fromCharCode(right)+rank)
                right=right+1
                break
            }else{
                break
            }
        }
        var left = file.charCodeAt(0)-1
        while(left>=97){
            if(occupied[String.fromCharCode(left)+rank].colour === "none"){
                legalPositions.push(String.fromCharCode(left)+rank)
                left=left-1
            }else if(occupied[String.fromCharCode(left)+rank].colour != colour){
                capture.push(String.fromCharCode(left)+rank)
                left=left-1
                break
            }else{
                break
            }
        }
        ans.push(legalPositions, capture)
        return ans
    }else if(piece === "king"){
        var fileC = file.charCodeAt(0)
        var checker = []
        if(parseInt(rank)+1 <= 8){
            checker.push(file+(parseInt(rank)+1))
            if(fileC+1 <= 104){
                checker.push(String.fromCharCode(fileC+1)+(parseInt(rank)+1))
            }
        }
        if(fileC+1 <= 104){
            checker.push(String.fromCharCode(fileC+1)+rank)
            if(parseInt(rank)-1 > 0){
                checker.push(String.fromCharCode(fileC+1)+(parseInt(rank)-1))
            }
        }
        if(parseInt(rank)-1 > 0){
            checker.push(file+(parseInt(rank)-1))
            if(fileC-1 >= 97){
                checker.push(String.fromCharCode(fileC-1)+(parseInt(rank)-1))
            }
        }
        if(fileC-1 >= 97){
            checker.push(String.fromCharCode(fileC-1)+rank)
            if(parseInt(rank)+1 <= 8){
                checker.push(String.fromCharCode(fileC-1)+(parseInt(rank)+1))
            }
        }
        checker.forEach(position => {
            if(occupied[position].colour === "none"){
                legalPositions.push(position)
            }else if(occupied[position].colour != colour){
                capture.push(position)
            }
        });
        ans.push(legalPositions, capture)
        return ans
    }else if(piece === "queen"){
        var fileC = file.charCodeAt(0)
        var i = 1
        while(parseInt(rank)+i <= 8){
            if(occupied[file+(parseInt(rank)+i)].colour === "none"){
                legalPositions.push(file+(parseInt(rank)+i))
            }else if(occupied[file+(parseInt(rank)+i)].colour != colour){
                capture.push(file+(parseInt(rank)+i))
                break
            }else{
                break
            }
            i=i+1
        }
        i=1
        while(fileC+i <= 104){
            if(occupied[String.fromCharCode(fileC+i)+rank].colour === "none"){
                legalPositions.push(String.fromCharCode(fileC+i)+rank)
            }else if(occupied[String.fromCharCode(fileC+i)+rank].colour != colour){
                capture.push(String.fromCharCode(fileC+i)+rank)
                break
            }else{
                break
            }
            i=i+1
        }
        i=1
        while(parseInt(rank)-i > 0){
            if(occupied[file+(parseInt(rank)-i)].colour === "none"){
                legalPositions.push(file+(parseInt(rank)-i))
            }else if(occupied[file+(parseInt(rank)-i)].colour != colour){
                capture.push(file+(parseInt(rank)-i))
                break
            }
            else{
                break
            }
            i=i+1
        }
        i=1
        while(fileC-i >= 97){
            if(occupied[String.fromCharCode(fileC-i)+rank].colour === "none"){
                legalPositions.push(String.fromCharCode(fileC-i)+rank)
            }else if(occupied[String.fromCharCode(fileC-i)+rank].colour != colour){
                capture.push(String.fromCharCode(fileC-i)+rank)
                break
            }else{
                break
            }
            i=i+1
        }
        i=1
        while(fileC+i <= 104 && parseInt(rank)+i <= 8){
            if(occupied[String.fromCharCode(fileC+i)+(parseInt(rank)+i)].colour === "none"){
                legalPositions.push(String.fromCharCode(fileC+i)+(parseInt(rank)+i))
            }else if(occupied[String.fromCharCode(fileC+i)+(parseInt(rank)+i)].colour != colour){
                capture.push(String.fromCharCode(fileC+i)+(parseInt(rank)+i))
                break
            }else{
                break
            }
            i=i+1
        }
        i=1
        while(parseInt(rank)-i > 0 && fileC+i <= 104){
            if(occupied[String.fromCharCode(fileC+i)+(parseInt(rank)-i)].colour === "none"){
                legalPositions.push(String.fromCharCode(fileC+i)+(parseInt(rank)-i))
            }else if(occupied[String.fromCharCode(fileC+i)+(parseInt(rank)-i)].colour != colour){
                capture.push(String.fromCharCode(fileC+i)+(parseInt(rank)-i))
                break
            }else{
                break
            }
            i=i+1
        }
        i=1
        while(fileC-i >= 97 && parseInt(rank)-i > 0){
            if(occupied[String.fromCharCode(fileC-i)+(parseInt(rank)-i)].colour === "none"){
                legalPositions.push(String.fromCharCode(fileC-i)+(parseInt(rank)-i))
            }else if(occupied[String.fromCharCode(fileC-i)+(parseInt(rank)-i)].colour != colour){
                capture.push(String.fromCharCode(fileC-i)+(parseInt(rank)-i))
                break
            }else{
                break
            }
            i=i+1
        }
        i=1
        while(parseInt(rank)+i <= 8 && fileC-i >= 97){
            if(occupied[String.fromCharCode(fileC-i)+(parseInt(rank)+i)].colour === "none"){
                legalPositions.push(String.fromCharCode(fileC-i)+(parseInt(rank)+i))
            }else if(occupied[String.fromCharCode(fileC-i)+(parseInt(rank)+i)].colour != colour){
                capture.push(String.fromCharCode(fileC-i)+(parseInt(rank)+i))
                break
            }else{
                break
            }
            i=i+1
        }
        ans.push(legalPositions, capture)
        return ans
    }else if(piece === "bishop"){
        var fileC = file.charCodeAt(0)
        var i = 1
        while(fileC+i <= 104 && parseInt(rank)+i <= 8){
            if(occupied[String.fromCharCode(fileC+i)+(parseInt(rank)+i)].colour === "none"){
                legalPositions.push(String.fromCharCode(fileC+i)+(parseInt(rank)+i))
            }else if(occupied[String.fromCharCode(fileC+i)+(parseInt(rank)+i)].colour != colour){
                capture.push(String.fromCharCode(fileC+i)+(parseInt(rank)+i))
                break
            }else{
                break
            }
            i=i+1
        }
        i=1
        while(parseInt(rank)-i > 0 && fileC+i <= 104){
            if(occupied[String.fromCharCode(fileC+i)+(parseInt(rank)-i)].colour === "none"){
                legalPositions.push(String.fromCharCode(fileC+i)+(parseInt(rank)-i))
            }else if(occupied[String.fromCharCode(fileC+i)+(parseInt(rank)-i)].colour != colour){
                capture.push(String.fromCharCode(fileC+i)+(parseInt(rank)-i))
                break
            }else{
                break
            }
            i=i+1
        }
        i=1
        while(fileC-i >= 97 && parseInt(rank)-i > 0){
            if(occupied[String.fromCharCode(fileC-i)+(parseInt(rank)-i)].colour === "none"){
                legalPositions.push(String.fromCharCode(fileC-i)+(parseInt(rank)-i))
            }else if(occupied[String.fromCharCode(fileC-i)+(parseInt(rank)-i)].colour != colour){
                capture.push(String.fromCharCode(fileC-i)+(parseInt(rank)-i))
                break
            }else{
                break
            }
            i=i+1
        }
        i=1
        while(parseInt(rank)+i <= 8 && fileC-i >= 97){
            if(occupied[String.fromCharCode(fileC-i)+(parseInt(rank)+i)].colour === "none"){
                legalPositions.push(String.fromCharCode(fileC-i)+(parseInt(rank)+i))
            }else if(occupied[String.fromCharCode(fileC-i)+(parseInt(rank)+i)].colour != colour){
                capture.push(String.fromCharCode(fileC-i)+(parseInt(rank)+i))
                break
            }else{
                break
            }
            i=i+1
        }
        ans.push(legalPositions, capture)
        return ans
    }else if(piece === "knight"){
        var fileC = file.charCodeAt(0)
        if(parseInt(rank)+2 <= 8){
            if(fileC-1 >= 97){
                if(occupied[String.fromCharCode(fileC-1)+(parseInt(rank)+2)].colour === "none"){
                    legalPositions.push(String.fromCharCode(fileC-1)+(parseInt(rank)+2))
                }else if(occupied[String.fromCharCode(fileC-1)+(parseInt(rank)+2)].colour != colour){
                    capture.push(String.fromCharCode(fileC-1)+(parseInt(rank)+2))
                }
            }
            if(fileC+1 <= 104){
                if(occupied[String.fromCharCode(fileC+1)+(parseInt(rank)+2)].colour === "none"){
                    legalPositions.push(String.fromCharCode(fileC+1)+(parseInt(rank)+2))
                }else if(occupied[String.fromCharCode(fileC+1)+(parseInt(rank)+2)].colour != colour){
                    capture.push(String.fromCharCode(fileC+1)+(parseInt(rank)+2))
                }
            }
        }
        if(parseInt(rank)-2 > 0){
            if(fileC-1 >= 97){
                if(occupied[String.fromCharCode(fileC-1)+(parseInt(rank)-2)].colour === "none"){
                    legalPositions.push(String.fromCharCode(fileC-1)+(parseInt(rank)-2))
                }else if(occupied[String.fromCharCode(fileC-1)+(parseInt(rank)-2)].colour != colour){
                    capture.push(String.fromCharCode(fileC-1)+(parseInt(rank)-2))
                }
            }
            if(fileC+1 <= 104){
                if(occupied[String.fromCharCode(fileC+1)+(parseInt(rank)-2)].colour === "none"){
                    legalPositions.push(String.fromCharCode(fileC+1)+(parseInt(rank)-2))
                }else if(occupied[String.fromCharCode(fileC+1)+(parseInt(rank)-2)].colour != colour){
                    capture.push(String.fromCharCode(fileC+1)+(parseInt(rank)-2))
                }
            }
        }
        if(fileC+2 <= 104){
            if(parseInt(rank)-1 > 0){
                if(occupied[String.fromCharCode(fileC+2)+(parseInt(rank)-1)].colour === "none"){
                    legalPositions.push(String.fromCharCode(fileC+2)+(parseInt(rank)-1))
                }else if(occupied[String.fromCharCode(fileC+2)+(parseInt(rank)-1)].colour != colour){
                    capture.push(String.fromCharCode(fileC+2)+(parseInt(rank)-1))
                }
            }
            if(parseInt(rank)+1 <= 8){
                if(occupied[String.fromCharCode(fileC+2)+(parseInt(rank)+1)].colour === "none"){
                    legalPositions.push(String.fromCharCode(fileC+2)+(parseInt(rank)+1))
                }else if(occupied[String.fromCharCode(fileC+2)+(parseInt(rank)+1)].colour != colour){
                    capture.push(String.fromCharCode(fileC+2)+(parseInt(rank)+1))
                }
            }
        }
        if(fileC-2 >= 97){
            if(parseInt(rank)-1 > 0){
                if(occupied[String.fromCharCode(fileC-2)+(parseInt(rank)-1)].colour === "none"){
                    legalPositions.push(String.fromCharCode(fileC-2)+(parseInt(rank)-1))
                }else if(occupied[String.fromCharCode(fileC-2)+(parseInt(rank)-1)].colour != colour){
                    capture.push(String.fromCharCode(fileC-2)+(parseInt(rank)-1))
                }
            }
            if(parseInt(rank)+1 <= 8){
                if(occupied[String.fromCharCode(fileC-2)+(parseInt(rank)+1)].colour === "none"){
                    legalPositions.push(String.fromCharCode(fileC-2)+(parseInt(rank)+1))
                }else if(occupied[String.fromCharCode(fileC-2)+(parseInt(rank)+1)].colour != colour){
                    capture.push(String.fromCharCode(fileC-2)+(parseInt(rank)+1))
                }
            }
        }
        ans.push(legalPositions, capture)
        return ans
    }
}

const showPointers = (positions) => {
    var availablePointers = Array.from(document.getElementsByClassName("pointer"))
    if(availablePointers.length != 0){
        removePointers(false, availablePointers)
    }
    if(positions.length != 0){
        (positions).forEach(position => {
            const newPointer = document.createElement("img")
            newPointer.src = "res/img/pointer.png"
            newPointer.className = "pointer"
            document.getElementById(position).appendChild(newPointer)
        });
    }
}

const removePointers = (all, positions) => {
    const allPositions = Array.from(document.getElementsByClassName("pointer"))
    if(all){
        allPositions.forEach(position => {
            position.remove()
        });
    }else{
        allPositions.forEach(position => {
            position.remove()
        })
    }
}

const canBeMoved = (e, providedData) => {
    var id = ""
    var parentId = ""
    if(providedData){
        id = providedData[0]
        parentId = providedData[1]
    }else{
        id = e.target.id
        parentId = e.path[1].id
    }
    var piece = ""
    var colour = ""
    if(id.charAt(0) === "p"){
        piece = "pawn"
    }else if(id.charAt(0) === "r"){
        piece = "rook"
    }else if(id.charAt(0) === "k" && id.length === 2){
        piece = "king"
    }else if(id.charAt(0) === "b"){
        piece = "bishop"
    }else if(id.charAt(0) === "q"){
        piece = "queen"
    }else if(id.charAt(0) === "k"){
        piece = "knight"
    }
    if(id.charAt(1) === "w"){
        colour = "white"
    }else{
        colour = "black"
    }
    const file = parentId.charAt(0)
    const rank = parentId.charAt(1)

    const legalMoves = legalMove(piece, colour, file, rank)
    showPointers(legalMoves[0])
    return legalMoves
}

var from = undefined

document.addEventListener("dragover", function(ev) {
    ev.preventDefault()
})

document.addEventListener("dragstart", function(ev) {
    removePointers(true, undefined)
    ev.dataTransfer.setData("pieceName", ev.target.id)
    ev.dataTransfer.setData("position", ev.path[1].id)
    from = ev.path[1].id
})

var colourNotAllowedToMove = "black"

document.addEventListener("drop", function(ev) {
    ev.preventDefault()
    var initialID = ev.dataTransfer.getData("pieceName")
    var initialPos = ev.dataTransfer.getData("position")
    var targetID = ev.target.id
    var colour = ""
    console.log(targetID, initialPos)
    if(initialID.charAt(1) === "b"){
        colour = "black"
    }else{
        colour = "white"
    }
    const possibleMoves = canBeMoved(undefined, [initialID, initialPos])
    if(possibleMoves[0].length === 0 && possibleMoves[1].length === 0){
        console.log("illegal move")
    }else{
        if(possibleMoves[0].includes(targetID)){
            if(colour === colourNotAllowedToMove){
                console.log("illegal move")
            }else{
                colourNotAllowedToMove = colour
                occupied[targetID].colour = colour
                occupied[initialPos].colour = "none"
                ev.target.appendChild(document.getElementById(initialID));
            }
        }else if(possibleMoves[1].length != 0){
            if(possibleMoves[1].includes(ev.path[1].id)){
                if(colour === colourNotAllowedToMove){
                    console.log("illegal move")
                }else{
                    colourNotAllowedToMove = colour
                    occupied[ev.path[1].id].colour = colour
                    occupied[initialPos].colour = "none"
                    document.getElementById(targetID).remove()
                    document.getElementById(ev.path[1].id).appendChild(document.getElementById(initialID));
                }
            }
        }else{
            console.log("illegal move")
        }
    }
    removePointers(true, undefined)
})

const removeAllPieces = () => {
    for(var i=1; i<=64; i++){
        var pos = document.getElementById(board[i])
        if(pos.childNodes.length != 0){
            pos.removeChild(pos.childNodes[0])
        }
        pos.remove()
    }
}

function reset() {
    for(var i=1; i<=64; i++){
        occupied[board[i]].colour = "none"
    }
    const parent = document.getElementById("board")
    if(parent.style.display === "grid"){
        removeAllPieces()
    }
    parent.style.display = "grid"
    var className = "position1 droptarget"
    for(var i=1; i<=64; i++){
        const div = document.createElement("div")
        div.id = board[i]
        if((i-1)%8 != 0){
            if(className!="position droptarget"){
                className="position droptarget"
            }else{
                className="position1 droptarget"
            }
        }
        div.className = className
        parent.appendChild(div)
        
    }
    setPieces()
}

function setPieces(){
    setThisPiece(["pw1","pw2","pw3","pw4","pw5","pw6","pw7","pw8"], [49,50,51,52,53,54,55,56],"pawnW","white")
    setThisPiece(["rw1","rw2"], [57,64], "rookW","white")
    setThisPiece(["bw1","bw2"], [59,62], "bishopW","white")
    setThisPiece(["kw1","kw2"], [58,63], "knightW","white")
    setThisPiece(["kw"], [61], "kingW","white")
    setThisPiece(["qw"], [60], "queenW","white")

    setThisPiece(["pb1","pb2","pb3","pb4","pb5","pb6","pb7","pb8"], [9,10,11,12,13,14,15,16],"pawnB","black")
    setThisPiece(["rb1","rb2"], [1,8], "rookB","black")
    setThisPiece(["bb1","bb2"], [3,6], "bishopB","black")
    setThisPiece(["kb1","kb2"], [2,7], "knightB","black")
    setThisPiece(["qb"], [4], "queenB","black")
    setThisPiece(["kb"], [5], "kingB","black")
}

const setThisPiece = (pieces, places, name, colour) => {
    var i = 0
    pieces.forEach(place => {
        const piece = document.createElement("img")
        piece.id = place
        piece.src = "res/img/"+name+".png"
        piece.draggable = true
        piece.className = "dragtarget"
        piece.addEventListener("click", function(e){
            canBeMoved(e, undefined)
        })
        document.getElementById(board[places[i]]).appendChild(piece)
        occupied[board[places[i]]].colour = colour
        i++
    })
}
