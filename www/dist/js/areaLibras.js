/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() 
    {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() 
    {
        indexArea = -1;
        indicadorAudio = -1;
        this.getSessoes();
    },
    getSessoes: function()
    {
        $.getJSON
        (
            "dist/js/obrasLibras.json", 
            function(dados)
            {
                if ('areas' in dados)
                {
                    areasLibras = dados.areas;

                    parametros = new URL(window.location.href).searchParams;
                    indexArea = parametros.get('indexArea');
					indexArea = parseInt(indexArea);
                    nomeArea = '';

                    areaLibras = areasLibras[indexArea];

                    btn_avancar.onclick = function()
                    {
                        if ((parseInt(indexArea) + 1) == 8)
                        {
                            history.replaceState({}, 'Avançar', 'subAreaLibras.html?indexArea=' + (parseInt(indexArea) + 1));
                        }
                        else
                        {
                            history.replaceState({}, 'Avançar', 'areaLibras.html?indexArea=' + (parseInt(indexArea) + 1));
                        }
                        
                        window.location.reload();
                    }

                    btn_retroceder.onclick = function()
                    {
                        if ((parseInt(indexArea) - 1) == 8)
                        {
                            history.replaceState({}, 'Retroceder', 'subAreaLibras.html?indexArea=' + (parseInt(indexArea) - 1));
                        }
                        else
                        {
                            history.replaceState({}, 'Retroceder', 'areaLibras.html?indexArea=' + (parseInt(indexArea) - 1));
                        }

                        window.location.reload();
                    }

                    if (indexArea == 0)
                    {
                        btn_retroceder.remove();
                    }
                    else if (indexArea == areasLibras.length - 1)
                    {
                        btn_avancar.remove();
                    }

                    nomeArea = areaLibras.nome;

                    document.title = nomeArea.toLocaleUpperCase() + ' - GUIA "OS OBJETOS E SUAS NARRATIVAS"';
                    lbl_titulo.textContent = nomeArea.toLocaleUpperCase();
                            
                    while (lst_videos.firstChild)
                    {
                        lst_videos.removeChild(lst_videos.firstChild);
                    }

                    if ("subAreas" in areaLibras)
                    {
                        var subAreas = areaLibras.subAreas;

                        for (contSubArea = 0; contSubArea <= subAreas.length - 1; contSubArea = contSubArea + 1)
                        {
                            var elemento;

                            var elementoSubArea = document.createElement('div');
                            $(elementoSubArea).addClass('subArea');

                            if ("titulo" in subAreas[contSubArea])
                            {
                                var elementoTitulo = document.createElement('div');
                                $(elementoTitulo).addClass('row');
                                $(elementoTitulo).addClass('titulo');

                                elemento = document.createElement('div');
                                $(elemento).addClass('col-sm-12');
                                elementoTitulo.insertAdjacentElement('beforeend', elemento);

                                elemento = document.createElement('h3');
                                $(elemento).addClass('tituloSubArea');
                                elemento.id = subAreas[contSubArea].hash;
                                elemento.textContent = subAreas[contSubArea].titulo.toLocaleUpperCase();
                                elementoTitulo.children[0].insertAdjacentElement('beforeend', elemento);

                                elementoSubArea.insertAdjacentElement('beforeend', elementoTitulo);
                            }

                            if ("obras" in subAreas[contSubArea])
                            {
                                var obras = subAreas[contSubArea].obras;

                                var elementoObras = document.createElement('div');
                                $(elementoObras).addClass('row');
                                $(elementoObras).addClass('obras');

                                for (contObras = 0; contObras <= obras.length - 1; contObras = contObras + 1)
                                {
                                    elemento = document.createElement('div');
                                    $(elemento).addClass('col-sm-4');
                                    $(elemento).addClass('obra');
                                    elementoObras.insertAdjacentElement('beforeend', elemento);

                                    elemento = document.createElement('div');
                                    $(elemento).addClass('row');
                                    $(elemento).addClass('titulo');
                                    elementoObras.lastElementChild.insertAdjacentElement('beforeend', elemento);

                                    elemento = document.createElement('div');
                                    $(elemento).addClass('col-sm-12');
                                    elementoObras.lastElementChild.lastElementChild.insertAdjacentElement('beforeend', elemento);
                                    
                                    if (!(!("video" in obras[contObras]) && ("audio" in obras[contObras])))
                                    {
                                        elemento = document.createElement('h3');
                                        elemento.textContent = obras[contObras].nome.toLocaleUpperCase();
                                        elementoObras.lastElementChild.lastElementChild.children[0].insertAdjacentElement('beforeend', elemento);
                                    }

                                    /*
                                    elemento = document.createElement('br');
                                    elementoObras.lastElementChild.insertAdjacentElement('beforeend', elemento);
                                    */

                                    if ("video" in obras[contObras])
                                    {
                                        elemento = document.createElement('div');
                                        $(elemento).addClass('row');
                                        $(elemento).addClass('video');
                                        elementoObras.lastElementChild.insertAdjacentElement('beforeend', elemento);

                                        elemento = document.createElement('div');
                                        $(elemento).addClass('col-sm-12');
                                        elementoObras.lastElementChild.lastElementChild.insertAdjacentElement('beforeend', elemento);

                                        elemento = document.createElement('video');
                                        elemento.controls = true;
                                        elemento.preload = 'none';
                                        elemento.poster = (("video" in obras[contObras]) && obras[contObras].video != '#' && obras[contObras].video != '') ? 'dist/mp4/' + obras[contObras].video.replace('mp4', 'jpg') : '#';
                                        elemento.src = (("video" in obras[contObras]) && obras[contObras].video != '#' && obras[contObras].video != '') ? 'dist/mp4/' + obras[contObras].video : '#';
                                        
                                        elemento.onplay = function()
                                        {
                                            player_audio.pause();
                                        }

                                        elementoObras.lastElementChild.lastElementChild.children[0].insertAdjacentElement('beforeend', elemento);
                                    }

                                    if ("audio" in obras[contObras])
                                    {
                                        elemento = document.createElement('div');
                                        $(elemento).addClass('row');
                                        $(elemento).addClass('audio');
                                        elementoObras.lastElementChild.insertAdjacentElement('beforeend', elemento);

                                        elemento = document.createElement('div');
                                        $(elemento).addClass('col-sm-4');

                                        elemento.indexObra = contObras;
                                        elemento.audio = obras[contObras].audio;

                                        elemento.onclick = function()
                                        {
                                            player_audio.pause();
                                        
                                            if (indicadorAudio == this.indexObra)
                                            {
                                                /*
                                                player_audio.src = 'dist/mp3/AD/' + this.audio;
                                                player_audio.play();
                                                */

                                                playerObra = document.createElement('div');
                                                $(playerObra).addClass('row');
                                                $(playerObra).addClass('playerObra');

                                                elemento = document.createElement('div');
                                                $(elemento).addClass("col-sm-12")

                                                playerObra.insertAdjacentElement('beforeend', elemento);

                                                elemento = document.createElement('audio');
                                                elemento.controls = true;
                                                elemento.src = 'dist/mp4/' + this.audio;

                                                playerObra.children[0].insertAdjacentElement('beforeend', elemento);

                                                this.insertAdjacentElement('beforeend', playerObra);

                                                this.getElementsByTagName("audio")[0].play()

                                                indicadorAudio = -1;
                                            }
                                            else 
                                            {
                                                $(".playerObra").remove();

                                                player_audio.src = 'dist/mp4/' + this.audio.replace('.mp3', '_btn.mp3');
                                                player_audio.play();

                                                indicadorAudio = this.indexObra;
                                            }
                                        }

                                        elementoObras.lastElementChild.lastElementChild.insertAdjacentElement('beforeend', elemento);

                                        elemento = document.createElement('div');
                                        $(elemento).addClass('row');
                                        elementoObras.lastElementChild.lastElementChild.children[0].insertAdjacentElement('beforeend', elemento);

                                        elemento = document.createElement('div');
                                        $(elemento).addClass('col-sm-12');
                                        elementoObras.lastElementChild.lastElementChild.children[0].children[0].insertAdjacentElement('beforeend', elemento);

                                        elemento = document.createElement('a');
                                        elementoObras.lastElementChild.lastElementChild.children[0].children[0].insertAdjacentElement('beforeend', elemento);

                                        elemento = document.createElement('div');
                                        $(elemento).addClass('info-box');
                                        elementoObras.lastElementChild.lastElementChild.children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);

                                        elemento = document.createElement('span');
                                        $(elemento).addClass('info-box-icon');
                                        $(elemento).addClass('bg-green');
                                        elementoObras.lastElementChild.lastElementChild.children[0].children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);

                                        elemento = document.createElement('i');
                                        $(elemento).addClass('fa');
                                        elementoObras.lastElementChild.lastElementChild.children[0].children[0].children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);
                                        
                                        elemento = document.createElement('div');
                                        $(elemento).addClass('info-box-content');
                                        elementoObras.lastElementChild.lastElementChild.children[0].children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);
                                        
                                        elemento = document.createElement('span');
                                        $(elemento).addClass('info-box-text');
                                        elementoObras.lastElementChild.lastElementChild.children[0].children[0].children[0].children[0].children[1].insertAdjacentElement('beforeend', elemento);

                                        elemento = document.createElement('h3');
                                        elemento.textContent = obras[contObras].nome.toLocaleUpperCase();
                                        elementoObras.lastElementChild.lastElementChild.children[0].children[0].children[0].children[0].children[1].children[0].insertAdjacentElement('beforeend', elemento);
                                    }
                                }

                                elementoSubArea.insertAdjacentElement('beforeend', elementoObras);
                            }
                            
                            lst_videos.insertAdjacentElement('beforeend', elementoSubArea);
                        }
                    }

                    var hash = parametros.get('hash');

                    if (hash != null)
                    {
                        document.getElementById(hash).scrollIntoView();
                    }
                }
            }
        );
    }
};

app.initialize();