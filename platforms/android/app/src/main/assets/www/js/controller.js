document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){}

function connect(log){
    identifiant = document.log.mail.value;
    password = document.log.pass.value;
    user_info = login(identifiant, password);
    twttr.widgets.load(
        document.getElementById("accueil")
    );
    if(user_info.user_id !== undefined){
        user_role = (get_user_info(user_info.user_id));
        document.getElementById('connexion').style.display ='none';
        document.getElementById('home').style.display = 'block';
        document.getElementById('menu').style.display = 'block';
        addButtonRoles(user_role);
    }else{
        alert('connexion refusée');
    }
}
function logOff(){
    document.getElementById('accueil').style.display = 'none';
    document.getElementById('connexion').style.display ='flex';
    document.getElementById('menu').style.display = 'none';
    closeNav();
    hide_class("role_div");
    document.getElementById('button_list').innerHTML = "";
}

function addButtonRoles(user_role){
    loop = 0;
    role_list = Object.keys(user_role);
    var acc = 'tweet';
    var btnacc = document.createElement("BUTTON");
    btnacc.setAttribute("id", "accueil");
    btnacc.setAttribute("class", "roleButton");
    btnacc.setAttribute("onclick", "displayRole('"+acc+"')");
    btnacc.innerHTML = "Accueil";
    document.getElementById('button_list').appendChild(btnacc);
    for (var i in user_role) {
        if(user_role[i] != null){
            if(role_list[loop] != "utilisateur" && role_list[loop] != "entraineur"){
                var btn = document.createElement("BUTTON");
                btn.setAttribute("id", "test1");
                btn.setAttribute("class", "roleButton");
                btn.setAttribute("onclick", "displayRole('"+role_list[loop]+"')");
                btn.innerHTML = role_list[loop];
                document.getElementById('button_list').appendChild(btn);

            }
            if(role_list[loop] == "entraineur"){
                var btn = document.createElement("BUTTON");
                btn.setAttribute("id", "test1");
                btn.setAttribute("class", "roleButton");
                btn.setAttribute("onclick", "displayRole('entraineurMenu')");
                btn.innerHTML = role_list[loop];
                document.getElementById('button_list').appendChild(btn);

            }

        }
        loop++;
    }
    var btn = document.createElement("BUTTON");
    btn.setAttribute("id", "test1");
    btn.setAttribute("class", "roleButton");
    btn.setAttribute("onclick", "display_chat()");
    btn.innerHTML = "chat";
    document.getElementById('button_list').appendChild(btn);
}
function changeNav(){
    if(document.getElementById("mySidenav").style.width === "20%"){
        closeNav();
    }else{
        openNav();
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
    document.getElementById("mySidenav").style.minWidth = "210px";
    document.getElementById("mySidenav").style.maxWidth = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.minWidth = "0px";
}

function timestampToTime(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

function displayRole(role){
    console.log(role);
    closeNav();
    hide_class("role_div");
    remove_class("match_div");
    remove_class("boutonCoach");
    closeNav();
    document.getElementById(role).style.display ="flex";
    switch(role){
        case 'tweet':
            document.getElementById('tweet').style.visibility = 'visible';
            break;
        case "joueur":
            var matchs= get_matchs_joueur(user_role.joueur);
            display_match(matchs,role);
            document.getElementById(role).style.visibility ="visible";
            break;
        case "arbitre":
            var matchs = get_matchs_arbitre(user_role.arbitre);
            display_match(matchs,role);
            document.getElementById(role).style.visibility ="visible";
            break;
        case "otm":
            document.getElementById(role).appendChild(create_element("button","inscriptionOTM","boutonCoach","inscriptionOtm","Inscription aux matchs"));
            document.getElementById(role).appendChild(create_element("button","gestionScore","boutonCoach","gestionScore","Gestion des scores"));
            document.getElementById(role).style.visibility ="visible";
            break;
        case "entraineur":
            var matchs = get_matchs_coach(user_role.entraineur);
            display_match(matchs,role);
            document.getElementById(role).style.visibility ="visible";
            break;
        case "entraineurMenu":
            notifications = get_notification_by_coach_id(user_role['entraineur']);
            document.getElementById(role).appendChild(create_element("button","affichageMatch","boutonCoach","displayRole('entraineur')","Afficher les matchs"));
            document.getElementById(role).appendChild(create_element("button","choixEquipe","boutonCoach","display_equipe('"+user_role.entraineur+"')","Choisir les équipes"));
            document.getElementById(role).appendChild(create_element("button","affichageMatch","boutonCoach","remplace('"+user_role.entraineur+"')","Se faire remplacer"));
            if(notifications === null){
                document.getElementById(role).appendChild(create_element("button","notifications","boutonCoach","","Notifications (0)"));
            } else {
                document.getElementById(role).appendChild(create_element("button","notifications","boutonCoach","displayNotifications('"+user_role['entraineur']+"')","Notifications ("+notifications.length+")"));

            }
            document.getElementById(role).style.visibility ="visible";
            break;
        default:
            var matchs = get_all_matchs();
            display_match(matchs,role);
            document.getElementById(role).style.visibility ="visible";
            break;
    }

}

function inscriptionOtm() {
    remove_class("boutonCoach");
    var matchs = get_matchs_otm(user_role.otm);
    display_match(matchs,"otm");
    document.getElementById('otm').style.visibility ="visible";
}

function gestionScore() {
    remove_class("boutonCoach");
    var matchs = get_matchs_otm(user_role.otm);
    var loop = 0;
    for (var i in matchs) {
        if (matchs[i] != null) {
            document.getElementById(role).appendChild(create_element("ul", matchs[loop]['match']['id'], "match_div", "", ""));
            document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "match_info" + matchs[loop]['match']['id'], "", "", ""));
            document.getElementById("match_info" + matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "", "lieu : " + matchs[loop]['match']['lieux']));
            document.getElementById("match_info" + matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "", "Date : " + timestampToTime(matchs[loop]['match']['date'])));
            if (matchs[loop]['team'][0] != undefined) {
                document.getElementById("match_info" + matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "", "Equipe 1 : " + matchs[loop]['team'][0]['nom']));
            }
            if (matchs[loop]['team'][1] != undefined) {
                document.getElementById("match_info" + matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "", "Equipe 2 : " + matchs[loop]['team'][1]['nom']));
            }
            if (matchs[loop]['match']['selected']) {
                document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "", "scores : "));
                document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "", "<form name=\"score\" method=\"get\">\n" +
                    "            <input type=\"text\" class=\"input_text\" name=\"equipe1\" placeholder=\"score equipe 1 \"/>\n" +
                    "            <input type=\"text\" class=\"input_text\" name=\"equipe2\" placeholder=\"score equipe 2\"/>\n" +
                    "            <input type=\"button\" class=\"formButton\" name=\"bouton\" value=\"Valider\" onclick=\"sendScore(score)\"/>\n" +
                    "        </form>"));
                document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("BUTTON", "match" + [loop], "sub_button red_button", "subscribe_to_match(" + matchs[loop]['match']['id'] + ", '" + role + "', " + matchs[loop]['match']['selected'] + ", " + user_role.otm + ")", "-"));
            }
        }
    }
}
function sendScore(score){
    premierScore = document.score.equipe1.value;
    secondScore = document.score.equipe1.value;
    post_scores(premierScore,secondScore);
}
function display_chat() {
    var matchs = get_all_matchs();

    display_match(matchs,'chat');
    document.getElementById('chat').style.visibility ="visible";
}

function displayNotifications(idcoach){
    notifs = get_notification_by_coach_id(idcoach);
    remove_class("boutonCoach");
    var loop = 0;
    for(var i in notifs){
        var match = get_match_by_id(notifs[loop]['id_matchs']);

        if(notifs[i] != null){
            document.getElementById('entraineur').appendChild(create_element("div","notif_"+notifs[loop]['id'], "match_div", "",""));
            document.getElementById('notif_'+notifs[loop]['id']).appendChild(create_element("p","", "", "","Lieu : "+match['match']['lieux'] ));
            document.getElementById('notif_'+notifs[loop]['id']).appendChild(create_element("p","", "", "","Date : "+timestampToTime(match['match']['date'])));
            document.getElementById('notif_'+notifs[loop]['id']).appendChild(create_element("p","", "", "","Equipe 1 : "+match['team'][0]['nom'] ));
            document.getElementById('notif_'+notifs[loop]['id']).appendChild(create_element("p","", "", "","Equipe 2 : "+match['team'][1]['nom'] ));
            document.getElementById('notif_'+notifs[loop]['id']).appendChild(create_element("button","", "valide_notif green_button sub_button", "swap_coach('"+notifs[loop]['id']+"','"+notifs[loop]['id_demandeur']+"','"+notifs[loop]['id_receveur']+"','"+notifs[loop]['id_matchs']+"')","Valider le remplacement"));
            //document.getElementById('notif_'+notifs[loop]['id']).appendChild(create_element("button","", "refuse_notif red_button sub_button", "refuse_changement_coach('"+ +"','"+ +"','"+ +"','"+ +"')","Refuser le remplacement"));
        }
        loop++;
    }
    document.getElementById('entraineur').style.display="flex";

}

function swap_coach(idrequete,idcoach1,idcoach2,idmatch){
    valide_changement_coach(idrequete,idcoach1,idcoach2,idmatch);
    displayRole('entraineurMenu');
}

function remplace(coachid){
    remove_class("boutonCoach");
    var loop = 0;
    closeNav();
    var matchs = get_matchs_coach(coachid);
    for (var i in matchs) {
        if(matchs[i] != null){
            document.getElementById('entraineur').appendChild(create_element("ul", matchs[loop]['match']['id'], "match_div", "choixMatchRemplacement('"+coachid+"','"+matchs[loop]['match']['id']+"')",""));
            document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "match_info"+matchs[loop]['match']['id'], "", "",""));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","lieu : "+matchs[loop]['match']['lieux']));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Date : "+timestampToTime(matchs[loop]['match']['date'])));
            if(matchs[loop]['team'][0] != undefined){
                document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Equipe 1 : "+matchs[loop]['team'][0]['nom']));
            }
            if(matchs[loop]['team'][1] != undefined){
                document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Equipe 2 : "+matchs[loop]['team'][1]['nom']));
            }
            document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "display_"+matchs[loop]['match']['id'], "display_match_div", "",""));
            loop++;
        }
    }
    document.getElementById('entraineur').style.display ="flex";

}

function choixMatchRemplacement(idcoachsrc,idmatch){
    remove_class("match_div");
    var loop = 0;
    var coachs = get_all_coachs();
    for(var i in coachs){
        document.getElementById('entraineur').appendChild(create_element("button","","boutonCoach","notifReplace('"+idcoachsrc+"','"+coachs[loop]['id_entraineurs']+"','"+idmatch+"')",coachs[loop]['nom']+ " " +coachs[loop]['prenom']));
        loop++;
    }
}

function notifReplace(idcoachsrc,idcoachdst,idmatch){
    if(set_notif_remplacement(idcoachsrc,idcoachdst,idmatch)){
        alert("Notification envoyée");
    }
    else {
        alert("Problème d'envoi de la notification");
    }
    displayRole('entraineurMenu');
}

function display_equipe(){
    remove_class("boutonCoach");
    var loop = 0;
    closeNav();

    var matchs = get_matchs_coach(user_role.entraineur);
    for (var i in matchs) {
        if(matchs[i] != null){
            document.getElementById('entraineur').appendChild(create_element("ul", matchs[loop]['match']['id'], "match_div", "",""));
            document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "match_info"+matchs[loop]['match']['id'], "", "",""));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","lieu : "+matchs[loop]['match']['lieux']));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Date : "+timestampToTime(matchs[loop]['match']['date'])));
            if(matchs[loop]['team'][0] != undefined){
                document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Equipe 1 : "+matchs[loop]['team'][0]['nom']));
            }
            if(matchs[loop]['team'][1] != undefined){
                document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Equipe 2 : "+matchs[loop]['team'][1]['nom']));
            }
            document.getElementById("match_info"+matchs[loop]['match']['id']).setAttribute("onclick", "choice_player_list_on_match("+matchs[loop]['match']['id']+","+user_role.entraineur+")");
            document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "display_"+matchs[loop]['match']['id'], "display_match_div", "",""));
            loop++;
        }
    }
    document.getElementById('entraineur').style.display ="flex";
}
function hide_class(className) {
    var items = document.getElementsByClassName(className);
    for (var i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
}

function show_class(className) {
    var items = document.getElementsByClassName(className);
    for (var i = 0; i < items.length; i++) {
        items[i].style.display = "flex";
    }
}

function create_element($tag, $id, $class, $onclick, $html){
    var item = document.createElement($tag);
    if($id != "" && $id != undefined)item.setAttribute("id", $id);
    if($class != "" && $class != undefined)item.setAttribute("class", $class);
    if($onclick != "" && $onclick != undefined)item.setAttribute( "onclick", $onclick);
    if($html != "" && $html != undefined)item.innerHTML =$html;
    return item;
}

function remove_class($class) {
    $( "."+$class+"" ).remove();
}

function remove_id($id) {
    $( "#"+$id+"" ).remove();
}

function add_attribute_class($class, $attribut, $value){
    var items = document.getElementsByClassName($class);
    for (var i = 0; i < items.length; i++) {
        items[i].setAttribute($attribut, $value);
    }
}

function remove_attribute_class($class, $attribut){
    var items = document.getElementsByClassName($class);
    for (var i = 0; i < items.length; i++) {
        items[i].removeAttribute($attribut);
    }
}

function subscribe_to_match($match_id, $role, $selected, $id_role) {
    switch ($role) {
        case 'arbitre':
            if($selected){
                desinscription_match_arbitre($match_id,$id_role)
            }else{
                inscription_match_arbitre($match_id,$id_role);
            }
            break;
        case 'otm':
            if($selected){
                desinscription_match_otm($match_id,$id_role);
            }else{
                inscription_match_otm($match_id,$id_role);
            }
            break;
        default:
    }
    displayRole($role);
}



function select_player(id){
    if(document.getElementById("player_"+id).classList.contains("playerSelected")){
        document.getElementById("player_"+id).style.border = "1px solid rgb(136,136,136)";
        document.getElementById("player_"+id).classList.remove("playerSelected");
    }else{
        document.getElementById("player_"+id).style.border = "3px solid rgb(0,0,0)";
        document.getElementById("player_"+id).classList.add("playerSelected");
    }
}

function choice_player_list_on_match($id_match, îd_coach) {
    childNodes = document.getElementById("display_"+$id_match).childNodes;
    var deploy = false;


    for (var y = 0; y < childNodes.length; y++) {
        if(childNodes[y].className == "player_div"){
            deploy = true;
        }
    }

    if(!deploy){
        remove_class("player_list");
        remove_class("boutonCoach");
        remove_class("player_div");

        var player_list= get_player_list_by_id_coach($id_match, îd_coach);
        var selected_player_list=get_player_by_player_list(îd_coach, $id_match);
        document.getElementById($id_match).appendChild(create_element("ul","player_list"+$id_match, "player_list", "",""));
        var loop = 0;
        console.log(selected_player_list);
        for (var i in player_list) {
            if(player_list[i] != null){
                console.log(selected_player_list);
                if(isInArray(selected_player_list, player_list[loop]['id'])){
                    document.getElementById("display_"+$id_match).appendChild(create_element("ul","player_"+player_list[loop]['id'], "player_div playerSelected", "select_player('"+player_list[loop]['id']+"')",""));
                    document.getElementById("player_"+player_list[loop]['id']).style.border = "3px solid rgb(0,0,0)";
                }else{
                    document.getElementById("display_"+$id_match).appendChild(create_element("ul","player_"+player_list[loop]['id'], "player_div", "select_player('"+player_list[loop]['id']+"')",""));

                }
                document.getElementById("player_"+player_list[loop]['id']).appendChild(create_element("li", "", "player_info", "","nom : "+player_list[i]['nom']));
                document.getElementById("player_"+player_list[loop]['id']).appendChild(create_element("li", "", "player_info", "","prenom : "+player_list[i]['prenom']));
                loop++;
            }
        }
        document.getElementById($id_match).appendChild(create_element("button","valideEquipe","boutonCoach","valid_selection("+$id_match+","+îd_coach+")","Valider l'équipe"));
    }else{
        remove_class("player_list");
        remove_class("player_div");
        remove_class("valideEquipeButton");
    }
}

function valid_selection($id_coach, $id_match){
    console.log($id_coach);
    console.log($id_match);
    var id = [];
    var items = document.getElementsByClassName("playerSelected");
    for (var i = 0; i < items.length; i++) {
        id[i] = items[i].id.split('_')[1];

    }
    valid_list_match(id, $id_coach, $id_match);
    displayRole('entraineurMenu');

}

function isInArray(array, value) {
    var verif = false;
    for (var i in array) {
        if(array[i] === value){
            verif = true;
        }
    }
    return verif;
}

function display_player_list_on_match($id_match, îd_coach) {
    childNodes = document.getElementById("display_"+$id_match).childNodes;
    var deploy = false;

    for (var y = 0; y < childNodes.length; y++) {
        if(childNodes[y].className === "player_div"){
            deploy = true;
        }
    }

    if(!deploy){
        remove_class("player_list");
        remove_class("player_div");
        var player_list= get_player_list_by_id_coach($id_match, îd_coach);
        document.getElementById($id_match).appendChild(create_element("ul","player_list"+$id_match, "player_list", "",""));
        var loop = 0;
        for (var i in player_list) {
            if(player_list[i] != null){
                document.getElementById("display_"+$id_match).appendChild(create_element("ul","player_"+player_list[loop]['id'], "player_div", "show_player_info('"+player_list[loop]['id']+"', '"+$id_match+"', '"+îd_coach+"')",""));
                document.getElementById("player_"+player_list[loop]['id']).appendChild(create_element("li", "", "player_info", "","nom : "+player_list[i]['nom']));
                document.getElementById("player_"+player_list[loop]['id']).appendChild(create_element("li", "", "player_info", "","prenom : "+player_list[i]['prenom']));
                loop++;
            }
        }
    }else{
        remove_class("player_list");
        remove_class("player_div");
    }
}
function show_player_info($player_id){
    var player_profile = get_player_profile_by_id_player($player_id);
    childNodes = document.getElementById("player_"+$player_id).childNodes;
    var deploy = false;
    for (var i = 0; i < childNodes.length; i++) {
        if(childNodes[i].className == "player_info_supp"){
            deploy = true;
        }
    }
    if(!deploy){
        remove_class("player_info_list");
        remove_class("player_info_supp");
        remove_class("parent_info_list");
        remove_class("parent_info");
        document.getElementById("player_"+$player_id).appendChild(create_element("li","", "player_info_supp", "", "email : "+player_profile['mail']));
        document.getElementById("player_"+$player_id).appendChild(create_element("li","", "player_info_supp", "", "licence : "+player_profile['licence']));
        if(player_profile['image'] != false){
            document.getElementById("player_"+$player_id).appendChild(create_element("li","", "player_info_supp liImageLicence", "", "<img class = 'imageLicence' src ='"+player_profile['image']+"'/>"));
        }
        document.getElementById("player_"+$player_id).appendChild(create_element("li","", "player_info_supp", "", "telephone : "+player_profile['telephone']));
        if(player_profile['parent'][0] != undefined){
            for (var i = 0; i < player_profile['parent'].length; i++) {
                document.getElementById("player_"+$player_id).appendChild(create_element("ul","parent_"+player_profile['parent'][i]['id'], "parent_info_list", "",""));
                document.getElementById("parent_"+player_profile['parent'][i]['id']).appendChild(create_element("li","", "parent_info", "","nom : "+player_profile['parent'][i]['nom']));
                document.getElementById("parent_"+player_profile['parent'][i]['id']).appendChild(create_element("li","", "parent_info", "","prenom : "+player_profile['parent'][i]['prenom']));
                document.getElementById("parent_"+player_profile['parent'][i]['id']).appendChild(create_element("li","", "parent_info", "","mail : "+player_profile['parent'][i]['mail']));
                document.getElementById("parent_"+player_profile['parent'][i]['id']).appendChild(create_element("li","", "parent_info", "","telephone : "+player_profile['parent'][i]['telephone']));
            }
        }
    }else{
        remove_class("player_info_list");
        remove_class("player_info_supp");
        remove_class("parent_info_list");
        remove_class("parent_info");
    }
}

function display_match(matchs,role){
    var loop = 0;
    for (var i in matchs) {
        if(matchs[i] != null){
            document.getElementById(role).appendChild(create_element("ul", matchs[loop]['match']['id'], "match_div", "",""));
            document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "match_info"+matchs[loop]['match']['id'], "", "",""));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","lieu : "+matchs[loop]['match']['lieux']));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Date : "+timestampToTime(matchs[loop]['match']['date'])));
            if(matchs[loop]['team'][0] != undefined){
                document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Equipe 1 : "+matchs[loop]['team'][0]['nom']));
            }
            if(matchs[loop]['team'][1] != undefined){
                document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Equipe 2 : "+matchs[loop]['team'][1]['nom']));
            }
            closeNav();
            switch (role) {
                case 'arbitre':
                    document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "li"+matchs[loop]['match']['id'], "match_info", "","nombre d'arbitres : "+matchs[loop]['match']['nb_arbitres']));
                    if(matchs[loop]['match']['selected']){
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("BUTTON", "match"+[loop], "sub_button red_button", "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.arbitre+")","-"));
                    }else{
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("BUTTON", "match"+[loop], "sub_button green_button", "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.arbitre+")","+"));
                    }
                    break;
                case 'otm':
                    if(matchs[loop]['match']['selected']){
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","nombre d'otm : "+matchs[loop]['match']['nb_otm']));
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("BUTTON", "match"+[loop], "sub_button red_button", "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.otm+")","-"));
                    }else{
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","nombre d'otm : "+matchs[loop]['match']['nb_otm']));
                        document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("BUTTON", "match"+[loop], "sub_button green_button", "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.otm+")","+"));
                    }
                    break;
                case 'entraineur':
                    document.getElementById("match_info"+matchs[loop]['match']['id']).setAttribute("onclick", "display_player_list_on_match("+matchs[loop]['match']['id']+","+user_role.entraineur+")");
                    document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "display_"+matchs[loop]['match']['id'], "display_match_div", "",""));
                    break;
                case 'entraineurChoixEquipe':
                    /*document.getElementById("match_info"+matchs[loop]['match']['id']).setAttribute("onclick", "display_player_list_on_match("+matchs[loop]['match']['id']+","+user_role.entraineur+")");
                    document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "display_"+matchs[loop]['match']['id'], "display_match_div", "",""));
                    */break;
                default:
            }
            loop++;
        }
    }
}