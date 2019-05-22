function login(identifiant, password){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=login&login='+identifiant+'&password='+password, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_user_info(user_id){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_user_info&user_id='+user_id, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_all_matchs(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_match_list', false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_all_coach(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_coach_list', false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_matchs_joueur(user_id){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_match_list_by_id_player&player_id='+user_id, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_matchs_arbitre(arbitre_id){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_match_list_by_id_arbiter&arbiter_id='+arbitre_id, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_matchs_otm(otm_id){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_match_list_by_id_OTM&OTM_id='+otm_id, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_matchs_coach(coach_id){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_match_list_by_id_coach&coach_id='+coach_id, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function inscription_match_otm(id_match,id_otm) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=OTM_subscribe_to_match&OTM_id='+id_otm+'&match_id='+id_match, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function desinscription_match_otm(id_match,id_otm) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=OTM_unsubscribe_to_match&OTM_id='+id_otm+'&match_id='+id_match, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function inscription_match_arbitre(id_match,id_arbitre) {
    var request = new XMLHttpRequest();
    var test = request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=arbiter_subscribe_to_match&arbiter_id='+id_arbitre+'&match_id='+id_match, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function desinscription_match_arbitre(id_match,id_arbitre) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=arbiter_unsubscribe_to_match&arbiter_id='+id_arbitre+'&match_id='+id_match, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}


function get_player_list_by_id_coach(id_match,id_coach){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_player_list_by_match_id&coach_id='+id_coach+'&match_id='+id_match, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_player_profile_by_id_player(id_player){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_player_profile&player_id='+id_player, false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_notification_by_player_id(id_player){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_player_notification&user_id=' + id_player, false);
    request.send(null);
    if (request.status ===200) {

        return JSON.parse(request.responseText);
    }
}

function get_notification_by_coach_id(idcoach){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_switch_coach_request&id_coach='+idcoach,false);
    request.send(null);
    if (request.status ===200) {

        return JSON.parse(request.responseText);
    }
}

function set_notif_remplacement(idcoachsrc,idcoachdst,idmatch){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=send_switch_coach_request&id_demandeur='+idcoachsrc+'&id_receveur='+idcoachdst+'&id_match='+idmatch,false);
    request.send(null);
    if (request.status ===200) {

        return JSON.parse(request.responseText);
    }
}

function get_all_coachs(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_coach_list', false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
        return JSON.parse(request.responseText);
    }
}

function get_match_by_id(idmatch){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_match_info_by_id&match_id=' + idmatch, false);
    request.send(null);
    if (request.status ===200) {
        return JSON.parse(request.responseText);
    }
}

function validate_notif(idnotif){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php//api?action=valider_notification&notification_id='+idnotif, false);
    request.send(null);
    if (request.status ===200) {
        console.log(JSON.parse(request.responseText));
        return JSON.parse(request.responseText);
    }
}

function valide_changement_coach(idrequete,idcoach1,idcoach2,idmatch){
    var request = new XMLHttpRequest();
    //alert('https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=valid_switch_coach_request&id_request='+idrequete+'&id_coach1='+ idcoach1+'&id_coach2='+ idcoach2+'&id_match='+idmatch);
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=valid_switch_coach_request&id_request='+idrequete+'&id_coach1='+ idcoach1+'&id_coach2='+ idcoach2+'&id_match='+idmatch, false);
    request.send(null);
    if (request.status ===200) {
        console.log(JSON.parse(request.responseText));
        return JSON.parse(request.responseText);
    }
}

function get_player_by_player_list(id_coach, id_match){
    var request = new XMLHttpRequest();
    //alert('https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_player_list&coach_id=' + id_coach + '&match_id=' + id_match);
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_player_list&coach_id=' + id_coach + '&match_id=' + id_match, false);
    request.send(null);
    if (request.status ===200) {
        console.log(JSON.parse(request.responseText));
        return JSON.parse(request.responseText);
    }
}

function valid_list_match(player, match_id, coach_id){
    var loop = 1;
    var request = new XMLHttpRequest();

    var url = 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=create_player_list&match_id='+match_id+'&coach_id='+coach_id;
    for (var i in player) {
        url = url.concat('&player_id'+loop+'='+player[i]);
        loop++;
    }
    request.open('GET', url, false);
    request.send(null);
    if (request.status ===200) {

        return JSON.parse(request.responseText);
    }

}

////////////////////////////////CHAT///////////////////////

//recupère la liste des sujet pour un match
function get_subject_id(id_match, role){
    var request = new XMLHttpRequest();
    //alert('https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_subject_id&match_id=' + id_match+'&role='+role);
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_subject_id&match_id=' + id_match+'&role='+role, false);
    request.send(null);
    if (request.status ===200) {
        return JSON.parse(request.responseText);
    }
}

//recupère la liste des messages pour un sujet précis
function get_message(id_sujet, limit){
    var request = new XMLHttpRequest();
    //alert('https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_message_list&subject_id=' + id_sujet +'&limit='+limit);
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=get_message_list&subject_id=' + id_sujet+'&limit='+limit, false);
    request.send(null);
    if (request.status ===200) {
        return JSON.parse(request.responseText);
    }
}

//permet d'envoyer un message
function send_message(id_sujet, user_id, date, content){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://os-vps418.infomaniak.ch/etu_info/amsb1/DEV/index.php/api?action=send_message&id_sujet=' + id_sujet+'&user_id=' + user_id+'&date=' + date+'&content=' + content, false);
    request.send(null);
    if (request.status ===200) {
        return JSON.parse(request.responseText);
    }
}
