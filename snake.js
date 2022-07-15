
class snake {

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.tail = [];
    }

    get_score(){
        return this.tail.length;
    }

    move(direction){
        this.tail.add([this.x,this.y]);
        switch(direction){
            case 'left':
                this.x--;
                break;
            case 'right':
                this.x++;
                break;
            case 'up':
                this.y--;
                break;
            case 'down':
                this.y++;
                break;
        }
    }

    redreaw(){
        for(var i = 0; i < this.tail.length; i++){
            document.getElementById('' + this.tail[i][0] + this.tail[i][1]).style.backgroundColor = 'red';
        }
    }

}