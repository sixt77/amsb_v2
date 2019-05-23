document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){}



function connect(log){
    identifiant = document.log.mail.value;
    password = document.log.pass.value;
    user_info = login(identifiant, password);
    if(user_info.user_id !== undefined){
        user_role = (get_user_info(user_info.user_id));
        document.getElementById('connexion').style.display ='none';
        document.getElementById('menu').style.display = 'block';
        addButtonRoles(user_role);
    }else{
        alert('Connexion refusée');
    }
    displayRole('tweet');
}

function logOff(){
    document.getElementById('accueil').style.display = 'none';
    document.getElementById('connexion').style.display ='flex';
    document.getElementById('menu').style.display = 'none';
    closeNav();
    hide_class("role_div");
    document.getElementById('button_list').innerHTML = "";
}

function changeNav(){
    if(document.getElementById("mySidenav").style.height > "0%"){
        closeNav();
    }else{
        openNav();
    }
}

function openNav() {
    document.getElementById("mySidenav").style.height = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.height = "0%";
}

function timestampToTime(UNIX_timestamp){
    let a,months,year,month,
        date,hour,min,time;

    a = new Date(UNIX_timestamp * 1000);

    months = ['01','02','03','04','05','06','97','08','09','10','11','12'];
    year = a.getFullYear();
    month = months[a.getMonth()];
    date = a.getDate();
    hour = a.getHours();
    min = a.getMinutes();

    if ((a.getDate() < 10)) { date = '0' + date; }

    if ((a.getHours() < 10)) { hour = '0' + hour; }

    if ((a.getMinutes() < 10)) { min = '0' + min ; }

    time = date + '/' + month + '/' + year + ' - ' + hour + ':' + min ;

    return time;
}






function addButtonRoles(user_role){
    let loop = 0;
    let role_list = Object.keys(user_role);
    let btn,i;
    let acc = 'tweet';
    let btnacc = document.createElement("BUTTON");
    btnacc.setAttribute("id", "accueil");
    btnacc.setAttribute("class", "roleButton");
    btnacc.setAttribute("onclick", "changeNav();displayRole('"+acc+"')");
    btnacc.innerHTML = "Accueil";
    document.getElementById('button_list').appendChild(btnacc);
    for (i in user_role) {
        if(user_role[i] !== null){
            if(role_list[loop] !== "utilisateur" && role_list[loop] !== "entraineur" && role_list[loop] !== "otm"){
                btn = document.createElement("BUTTON");
                btn.setAttribute("id", "");
                btn.setAttribute("class", "roleButton");
                btn.setAttribute("onclick", "changeNav();displayRole('"+role_list[loop]+"')");
                btn.innerHTML = role_list[loop];
                document.getElementById('button_list').appendChild(btn);

            }
            if(role_list[loop] === "entraineur"){
                btn = document.createElement("BUTTON");
                btn.setAttribute("id", "");
                btn.setAttribute("class", "roleButton");
                btn.setAttribute("onclick", "changeNav();displayRole('entraineurMenu')");
                btn.innerHTML = role_list[loop];
                document.getElementById('button_list').appendChild(btn);

            }
            if(role_list[loop] === "otm"){
                btn = document.createElement("BUTTON");
                btn.setAttribute("id", "");
                btn.setAttribute("class", "roleButton");
                btn.setAttribute("onclick", "changeNav();displayRole('otmMenu')");
                btn.innerHTML = role_list[loop];
                document.getElementById('button_list').appendChild(btn);

            }

        }
        loop++;
    }
    btn = document.createElement("BUTTON");
    btn.setAttribute("id", "");
    btn.setAttribute("class", "roleButton");
    btn.setAttribute("onclick", "changeNav();displayRole('chat')");
    btn.innerHTML = "chat";
    document.getElementById('button_list').appendChild(btn);
}

function displayRole(role){
    console.log(role);
    hide_class("role_div");
    remove_class("match_div");
    remove_class("boutonCoach");
    var matchs;
    let ElmtRole = document.getElementById(role);

    ElmtRole.style.display ="flex";

    switch(role){
        case 'tweet':
            add_class_by_id("tri_temporel", "hidden");
            ElmtRole.style.display ="block";
            break;

        case "joueur":
            matchs = get_matchs_joueur(user_role.joueur);
            display_match(matchs,role);
            break;

        case "arbitre":
            matchs = get_matchs_arbitre(user_role.arbitre);
            display_match(matchs,role);
            break;

        case "otmMenu":
            ElmtRole.appendChild(create_element(
                "button",
                "inscriptionOTM",
                "boutonCoach",
                "displayRole('otm')",
                "Inscription aux matchs"));
            ElmtRole.appendChild(create_element(
                "button",
                "gestionScore",
                "boutonCoach",
                "gestionScore()",
                "Gestion des scores"));
            break;

        case "otm":
            matchs = get_matchs_otm(user_role.otm);
            display_match(matchs,role);
            break;

        case "entraineur":
            matchs = get_matchs_coach(user_role.entraineur);
            display_match(matchs,role);
            break;

        case "chat" :
            matchs = get_all_matchs();
            display_match(matchs,role);
            document.getElementById(role).style.visibility ="visible";
            break;

        case "entraineurMenu":
            var notifications = get_notification_by_coach_id(user_role['entraineur']);
            ElmtRole.appendChild(create_element(
                "button",
                "affichageMatch",
                "boutonCoach",
                "displayRole('entraineur')",
                "Afficher les matchs"));

            ElmtRole.appendChild(create_element(
                "button",
                "choixEquipe",
                "boutonCoach",
                "display_equipe('"+user_role.entraineur+"')",
                "Choisir les équipes"));

            ElmtRole.appendChild(create_element(
                "button",
                "affichageMatch",
                "boutonCoach",
                "remplace('"+user_role.entraineur+"')",
                "Se faire remplacer"));

            if(notifications === null){
                ElmtRole.appendChild(create_element(
                    "button",
                    "notifications",
                    "boutonCoach",
                    "",
                    "Notifications (0)"));
            } else {
                ElmtRole.appendChild(create_element(
                    "button",
                    "notifications",
                    "boutonCoach",
                    "displayNotifications('"+user_role['entraineur']+"')",
                    "Notifications ("+notifications.length+")"));
            }
            break;

        default:
            matchs = get_all_matchs();
            display_match(matchs,role);
            break;
    }

}

function gestionScore() {
    remove_class("boutonCoach");
    let matchs = get_matchs_otm(user_role.otm);
    let loop = 0;

    for (var i in matchs) {
        if (matchs[i] != null && matchs[loop]['match']['selected']) {

            // ul : liste match info
            document.getElementById('otm')
                .appendChild(create_element(
                    "ul",
                    "match_info" + matchs[loop]['match']['id'],
                    "match_div",
                    "",
                    ""));

            // li : info match
            document.getElementById("match_info" + matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "li",
                    "",
                    "match_info match_info_local",
                    "",
                    "Local"));

            document.getElementById("match_info" + matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "li",
                    "",
                    "match_info match_info_exterieur",
                    "",
                    "Extérieur"));

            if (matchs[loop]['team'][0] !== undefined) {
                document.getElementById("match_info" + matchs[loop]['match']['id'])
                    .appendChild(create_element(
                        "li",
                        "",
                        "match_info match_info_teamlocal",
                        "",
                        "" + matchs[loop]['team'][0]['nom']));
            }

            if (matchs[loop]['team'][1] !== undefined) {
                document.getElementById("match_info" + matchs[loop]['match']['id'])
                    .appendChild(create_element(
                        "li",
                        "",
                        "match_info match_info_teamtext",
                        "",
                        "" + matchs[loop]['team'][1]['nom']));
            }

            document.getElementById("match_info" + matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "li",
                    "",
                    "match_info match_info_lieu_item",
                    "",
                    "" + matchs[loop]['match']['lieux']));

            document.getElementById("match_info" + matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "li",
                    "",
                    "match_info match_info_date_item",
                    "",
                    "" + timestampToTime(matchs[loop]['match']['date'])));

            document.getElementById("match_info" + matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "li",
                    "",
                    "match_info",
                    "",
                    "scores : "));

            document.getElementById("match_info" + matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "li",
                    "divScore"+matchs[loop]['match']['id'],
                    "divScore",
                    "",
                    ""));

            document.getElementById("divScore" + matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "input",
                    "score1"+matchs[loop]['match']['id'],
                    "score",
                    "",
                    ""))
                .setAttribute("placeholder", "Local");

            document.getElementById("divScore" + matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "input",
                    "score2"+matchs[loop]['match']['id'],
                    "score",
                    "",
                    ""))
                .setAttribute("placeholder", "Extérieur");

            document.getElementById("match_info" + matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "BUTTON",
                    "validScore",
                    "boutonScore",
                    "sendScore('"+matchs[loop]['match']['id']+"')",
                    "Valider le score final"))
                .setAttribute("placeholder", "Extérieur");

        }
        loop++;
        console.log(matchs[loop]);
    }
    document.getElementById('otm').style.display = 'flex';
}

function sendScore(id){
    let premierScore = document.getElementById('score1'+id).value;
    let secondScore  = document.getElementById('score2'+id).value;
    if(post_score(id,premierScore,secondScore)){
        alert('score envoyé');
    }else{
        alert('erreur');
    }

}

function display_chat() {
    var matchs = get_all_matchs();
    display_match(matchs,'chat');
    document.getElementById('chat').style.display ="block";
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
function display_subject(id_match) {
    subjects =  get_subject_list(id_match);
    if(count_class("match_info"+id_match, "sujets_div")===0){
        remove_class("sujets_div");
        remove_class("chat_box");
        for (var i in subjects){
            document.getElementById("match_info"+id_match).appendChild(create_element('div', "sujet_"+subjects[i]['id_sujets'], "sujets_div", "display_message('"+subjects[i]['id_sujets']+"')", subjects[i]['role']))
        }
    }
}

function display_message(id_subject) {
    message_list = get_message(id_subject, 10);
    console.log(message_list);
    //console.log(message_list);
    if(count_class("sujet_"+id_subject, "message_list")===0){
        document.getElementById("sujet_"+id_subject).appendChild(create_element("DIV","message_list_"+id_subject,"message_list", "", ""));

        document.getElementById("sujet_"+id_subject).appendChild(create_input("text", "chat_box_"+id_subject, "chat_box", "", ""));
        console.log("num : "+id_subject);
        document.getElementById("sujet_"+id_subject).appendChild(create_button("", "", "envoyer", "send_message("+id_subject+", "+user_info['user_id']+")"));
    }
    remove_class("message_body");
    for(var i in message_list){
        document.getElementById("message_list_"+id_subject).appendChild(create_element("DIV", "", "message_body", "", "de : "+message_list[i]['nom']+" "+message_list[i]['prenom']+" : "+message_list[i]['contenu']));
    }
}

function send_message(id_sujet, id_user) {
    var text = document.getElementById("chat_box_"+id_sujet).value;
    if(post_message(id_sujet, id_user, new Date().getTime(), text)){
        display_message(id_sujet);
        document.getElementById("chat_box_"+id_sujet).value = "";
    }else{
        alert('erreur');
    }

}

function swap_coach(idrequete,idcoach1,idcoach2,idmatch){
    valide_changement_coach(idrequete,idcoach1,idcoach2,idmatch);
    displayRole('entraineurMenu');
}

function remplace(coachid){
    remove_class("boutonCoach");
    var loop = 0;
    changeNav();
    var matchs = get_matchs_coach(coachid);
    for (var i in matchs) {
        if(matchs[i] != null){
            document.getElementById('entraineur').appendChild(create_element("ul", matchs[loop]['match']['id'], "match_div", "choixMatchRemplacement('"+coachid+"','"+matchs[loop]['match']['id']+"')",""));
            document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "match_info"+matchs[loop]['match']['id'], "", "",""));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","lieu : "+matchs[loop]['match']['lieux']));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Date : "+timestampToTime(matchs[loop]['match']['date'])));
            if(matchs[loop]['team'][0] !== undefined){
                document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Equipe 1 : "+matchs[loop]['team'][0]['nom']));
            }
            if(matchs[loop]['team'][1] !== undefined){
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
    changeNav();

    var matchs = get_matchs_coach(user_role.entraineur);
    for (var i in matchs) {
        if(matchs[i] != null){
            document.getElementById('entraineur').appendChild(create_element("ul", matchs[loop]['match']['id'], "match_div", "",""));
            document.getElementById(matchs[loop]['match']['id']).appendChild(create_element("ul", "match_info"+matchs[loop]['match']['id'], "", "",""));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","lieu : "+matchs[loop]['match']['lieux']));
            document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Date : "+timestampToTime(matchs[loop]['match']['date'])));
            if(matchs[loop]['team'][0] !== undefined){
                document.getElementById("match_info"+matchs[loop]['match']['id']).appendChild(create_element("li", "", "match_info", "","Equipe 1 : "+matchs[loop]['team'][0]['nom']));
            }
            if(matchs[loop]['team'][1] !== undefined){
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
    if($id !== "" && $id !== undefined)item.setAttribute("id", $id);
    if($class !== "" && $class !== undefined)item.setAttribute("class", $class);
    if($onclick !== "" && $onclick !== undefined)item.setAttribute( "onclick", $onclick);
    if($html !== "" && $html !== undefined)item.innerHTML =$html;
    return item;
}

function create_input($type, $id, $class, $name, $required){
    var item = document.createElement("input");
    item.type = $type;
    if($id != "" && $id != undefined)item.setAttribute("id", $id);
    if($class != "" && $class != undefined)item.setAttribute("class", $class);
    if($name != "" && $name != undefined)item.setAttribute("name", $name);
    if($required != "" && $required != undefined)item.setAttribute("required", 'required');
    return item;
}

function create_button($id, $class, $value, $onclick){
    var item = document.createElement("input");
    item.type = "button";
    if($id != "" && $id != undefined)item.setAttribute("id", $id);
    if($class != "" && $class != undefined)item.setAttribute("class", $class);
    if($onclick != "" && $onclick != undefined)item.setAttribute( "onclick", $onclick);
    if($value != "" && $value != undefined)item.value = $value;
    return item;
}

function remove_class($class) {
    $( "."+$class+"" ).remove();
}

function remove_class_by_id(id, class1) {
    $( "#"+id+"" ).removeClass(class1);
}
function add_class_by_id(id, class1) {
    $( "#"+id+"" ).addClass(class1);
}

function  add_class_by_class(class1, class2) {
    $( "."+class1+"" ).addClass(class2);
}

function count_class(id, class1) {
    childNodes = document.getElementById(id).childNodes;
    var nb = 0;
    for (var i = 0; i < childNodes.length; i++) {
        if(childNodes[i].className == class1){
            nb++;
        }
    }
    return nb;
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

function sort_match_by_date(date1, date2, classe){
    var array = get_all_matchs();
    var j = 0;
    var array2 = new Array();
    if(date1 == null && date2 == null){
        for(var i in array){
            remove_class_by_id(array[i]['match']['id'], "hide_by_date");
        }
    }else{
        for(var i in array){
            if(date1<array[i]['match']['date'] && date2>array[i]['match']['date']){
                array2[j] = array[i];
                j++;
            }
        }
        console.log(array2);
        add_class_by_class(classe, "hide_by_date");
        for(var i in array2){
            remove_class_by_id(array2[i]['match']['id'], "hide_by_date");

        }
    }
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

function choice_player_list_on_match($id_match, $id_coach) {
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

        var player_list= get_player_list_by_id_coach($id_match, $id_coach);
        var selected_player_list=get_player_by_player_list($id_coach, $id_match);
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
        document.getElementById($id_match).appendChild(create_element("button","valideEquipe","boutonCoach","valid_selection("+$id_match+","+$id_coach+")","Valider l'équipe"));
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

function display_player_list_on_match($id_match, $id_coach) {
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
        var player_list= get_player_list_by_id_coach($id_match, $id_coach);
        document.getElementById($id_match).appendChild(create_element("ul","player_list"+$id_match, "player_list", "",""));
        var loop = 0;
        for (var i in player_list) {
            if(player_list[i] !== null){
                document.getElementById("display_"+$id_match).appendChild(create_element("ul","player_"+player_list[loop]['id'], "player_div", "show_player_info('"+player_list[loop]['id']+"', '"+$id_match+"', '"+$id_coach+"')",""));
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
    remove_class_by_id("tri_temporel", "hidden");
    var loop = 0;
    for (var i in matchs) {
        if(matchs[i] != null){

            // ul : Liste info match
            document.getElementById(role)
                .appendChild(create_element(
                    "ul",
                    ""+matchs[loop]['match']['id'],
                    "match_div",
                    "",
                    ""));

            document.getElementById(matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "div",
                    "match_info"+matchs[loop]['match']['id'],
                    "",
                    "",
                    ""));

            // li : info match
            document.getElementById("match_info"+matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "li",
                    "",
                    "match_info match_info_local",
                    "",
                    "Local"));

            document.getElementById("match_info"+matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "li",
                    "",
                    "match_info match_info_exterieur",
                    "",
                    "Extérieur"));

            if(matchs[loop]['team'][0] !== undefined){
                document.getElementById("match_info"+matchs[loop]['match']['id'])
                    .appendChild(create_element(
                        "li",
                        "",
                        "match_info match_info_teamlocal",
                        "",
                        ""+matchs[loop]['team'][0]['nom']));
            }

            if(matchs[loop]['team'][1] !== undefined){
                document.getElementById("match_info"+matchs[loop]['match']['id'])
                    .appendChild(create_element(
                        "li",
                        "",
                        "match_info match_info_teamtext",
                        "",
                        ""+matchs[loop]['team'][1]['nom']));
            }

            document.getElementById("match_info"+matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "li",
                    "",
                    "match_info match_info_lieu_item",
                    "",
                    ""+matchs[loop]['match']['lieux']));
            document.getElementById("match_info"+matchs[loop]['match']['id'])
                .appendChild(create_element(
                    "li",
                    "",
                    "match_info match_info_date_item",
                    "",
                    ""+timestampToTime(matchs[loop]['match']['date'])));


            switch (role) {
                case 'arbitre':

                    // li : text nb arbitre
                    document.getElementById("match_info"+matchs[loop]['match']['id'])
                        .appendChild(create_element(
                            "li",
                            "li"+matchs[loop]['match']['id'],
                            "match_info match_info_arbiter_text",
                            "",
                            "nombre d'arbitres"));

                    // li : nb arbitre
                    document.getElementById("match_info"+matchs[loop]['match']['id'])
                        .appendChild(create_element(
                            "li",
                            "li"+matchs[loop]['match']['id'],
                            "match_info match_info_arbiter_nb",
                            "",
                            ""+matchs[loop]['match']['nb_arbitres']));

                    // button : inscription arbitre au match
                    if(matchs[loop]['match']['selected']){
                        document.getElementById(matchs[loop]['match']['id'])
                            .appendChild(create_element(
                                "BUTTON",
                                "match"+[loop],
                                "sub_button red_button",
                                "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.arbitre+")",
                                "-"));
                    }else{
                        document.getElementById(matchs[loop]['match']['id'])
                            .appendChild(create_element(
                                "BUTTON",
                                "match"+[loop],
                                "sub_button green_button",
                                "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.arbitre+")",
                                "+"));
                    }
                    break;

                case 'otm':

                    // li : text nb otm
                    document.getElementById("match_info"+matchs[loop]['match']['id'])
                        .appendChild(create_element(
                            "li",
                            "",
                            "match_info match_info_otm_text",
                            "",
                            "nombre d'otm"));

                    // li : nb otm
                    document.getElementById("match_info"+matchs[loop]['match']['id'])
                        .appendChild(create_element(
                            "li",
                            "",
                            "match_info match_info_otm_nb",
                            "",
                            ""+matchs[loop]['match']['nb_otm']));

                    // button : inscription otm au match
                    if(matchs[loop]['match']['selected']){
                        document.getElementById(matchs[loop]['match']['id'])
                            .appendChild(create_element(
                                "BUTTON",
                                "match"+[loop],
                                "sub_button red_button",
                                "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.otm+")",
                                "-"));
                    }else{
                        document.getElementById(matchs[loop]['match']['id'])
                            .appendChild(create_element(
                                "BUTTON",
                                "match"+[loop],
                                "sub_button green_button",
                                "subscribe_to_match("+matchs[loop]['match']['id']+", '"+role+"', "+matchs[loop]['match']['selected']+", "+user_role.otm+")",
                                "+"));
                    }
                    break;

                case 'entraineur':
                    document.getElementById("match_info"+matchs[loop]['match']['id'])
                        .setAttribute(
                            "onclick",
                            "display_player_list_on_match("+matchs[loop]['match']['id']+","+user_role.entraineur+")");
                    document.getElementById(matchs[loop]['match']['id'])
                        .appendChild(create_element(
                            "ul",
                            "display_"+matchs[loop]['match']['id'],
                            "display_match_div",
                            "",
                            ""));
                    break;

                case "chat" :
                    document.getElementById("match_info"+matchs[loop]['match']['id']).setAttribute("onclick", "display_subject("+matchs[loop]['match']['id']+")");
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