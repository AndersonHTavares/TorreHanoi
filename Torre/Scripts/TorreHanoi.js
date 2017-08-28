

function createStack(nDiscs,nTorre){
    var nTorre = '';

    $('#stacks').html('');

        var stacks=document.getElementById("stacks");
        stacks.innerHTML="";
        var stack0=document.createElement("div");
        stack0.className="stack";
        stacks.appendChild(stack0);

         var stack1=document.createElement("div");
        stack1.className="stack";
        stacks.appendChild(stack1);

        var stack2=document.createElement("div");
        stack2.className="stack";
        stacks.appendChild(stack2);

          for(var i=0;i<nDiscs;i++){
            var f=(i+1)/nDiscs;
            var disc=document.createElement("div");
            disc.className="disc";
            disc.style.width=(100-60*(1-f))+"%";
            disc.id=nTorre +"stack0_disc"+(nDiscs-i-1);
            stack0.appendChild(disc);
            disc=document.createElement("div");
            disc.className="disc";
            disc.style.width=(100-60*(1-f))+"%";
            disc.id=nTorre +"stack1_disc"+(nDiscs-i-1);
            stack1.appendChild(disc);
            disc=document.createElement("div");
            disc.className="disc";
            disc.style.width=(100-60*(1-f))+"%";
            disc.id=nTorre +"stack2_disc"+(nDiscs-i-1);
            stack2.appendChild(disc);
        }
    }
    
    var moves=[];
    var discs=[];
    var iPos=-1;
    function solve(qtdDisco, posicao) {
        iPos = -1;

        var nDiscs = qtdDisco;
        document.getElementById("controls").style.display="none";
        moves=[];
        discs=[];
    
        createStack(nDiscs, i);

        for(var i=0;i<nDiscs;i++) discs.push(0);

        var radios = document.getElementsByName("dest");
        var destination = 1;

        for (var i = 0; i < radios.length; i++)
            if (radios[i].checked) {
                destination = radios[i].value;
                break;
            }

        move(0,0,Number(destination));
        
        var interval = setInterval(function () {

            if(iPos==moves.length){
                document.getElementById("controls").style.display="";
                clearInterval(interval);
                iPos=-1;
                return;
            } else if (iPos == -1) {

              
                for(var i=0;i<discs.length;i++){
                    document.getElementById("stack0_disc"+i).className="disc selected";
                    document.getElementById("stack1_disc"+i).className="disc";
                    document.getElementById("stack2_disc"+i).className="disc";
                }

            } else {

                if (iPos == posicao) return;
                var m=moves[iPos];
                document.getElementById("stack"+m[1]+"_disc"+m[0]).className="disc";
                document.getElementById("stack"+m[2]+"_disc"+m[0]).className="disc selected";
            }
            iPos++;
        },10);
    }

    function move(disc,src,dst){
        var s=false;
        for(var i=disc+1;i<discs.length;i++){
            if(discs[i]==src){s=true; break;}
        }
        if(!s){
            moves.push([disc,discs[disc],dst]);
            discs[disc]=dst;
        }else{
            var tempDst=src == 0 && dst == 1 || src == 1 && dst == 0 ? 2 : src == 0 && dst == 2 || src == 2 && dst == 0 ? 1 : 0;
            move(disc+1,src,tempDst);
            moves.push([disc,discs[disc],dst]);
            discs[disc]=dst;
            move(disc+1,tempDst,dst);
        }   
    }

