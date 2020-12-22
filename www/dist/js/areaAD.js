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
		indexObra = -1;
        indicadorAudio = -1;

        btn_voltar.onclick = function()
        {
            if (indicadorAudio == -2)
            {
                indicadorAudio = -1;
                history.back();
            }
            else
            {
                indicadorAudio = -2;

                try
                {
                    $(".playerObra").remove();                
                }
                finally
                {
                    player_audio.pause();
                    player_audio.src = 'dist/mp3/botoes/btn_voltar.mp3';
                    player_audio.play();
                }
            }

            return false;
        }

        this.getSessoes();
    },
    getSessoes: function()
    {
        $.getJSON
        (
            "dist/js/obrasAD.json", 
            function(dados)
            {
                if ('areas' in dados)
                {
                    areasAD = dados.areas;

                    parametros = new URL(window.location.href).searchParams;
                    indexArea = parametros.get('indexArea');
                    nomeArea = '';

                    areaAD = areasAD[indexArea];

                    btn_avancar.onclick = function()
                    {
                        if (indicadorAudio == -3)
                        {
                            indicadorAudio = -1;

                            if ((parseInt(indexArea) + 1) == 8)
                            {
                                history.replaceState({}, 'Avançar', 'subAreaAD.html?indexArea=' + (parseInt(indexArea) + 1));
                            }
                            else
                            {
                                history.replaceState({}, 'Avançar', 'areaAD.html?indexArea=' + (parseInt(indexArea) + 1));
                            }

                            window.location.reload();
                        }
                        else
                        {
                            indicadorAudio = -3;

                            try
                            {
                                $(".playerObra").remove();
                            }
                            finally
                            {
                                player_audio.pause();
                                player_audio.src = 'dist/mp3/botoes/btn_proxima_area.mp3';
                                player_audio.play();
                            }
                        }
                    }

                    btn_retroceder.onclick = function()
                    {
                        if (indicadorAudio == -4)
                        {
                            indicadorAudio = -1;

                            if ((parseInt(indexArea) - 1) == 8)
                            {
                                history.replaceState({}, 'Retroceder', 'subAreaAD.html?indexArea=' + (parseInt(indexArea) - 1));
                            }
                            else
                            {
                                history.replaceState({}, 'Retroceder', 'areaAD.html?indexArea=' + (parseInt(indexArea) - 1));
                            }
                            
                            window.location.reload();
                        }
                        else
                        {
                            indicadorAudio = -4;

                            try
                            {
                                $(".playerObra").remove();                            
                            }
                            finally
                            {
                                player_audio.pause();
                                player_audio.src = 'dist/mp3/botoes/btn_area_anterior.mp3';
                                player_audio.play();
                            }
                        }                        
                    }

                    if (indexArea == 0)
                    {
                        btn_retroceder.remove();
                    }
                    else if (indexArea == areasAD.length - 1)
                    {
                        btn_avancar.remove();
                    }

                    nomeArea = areaAD.nome;

                    document.title = nomeArea.toLocaleUpperCase() + ' - GUIA "OS OBJETOS E SUAS NARRATIVAS"';
                    lbl_titulo.textContent = nomeArea.toLocaleUpperCase();
                            
                    while (lst_audios.firstChild)
                    {
                        lst_audios.removeChild(lst_audios.firstChild);
                    }

                    if ("subAreas" in areaAD)
                    {
                        var subAreas = areaAD.subAreas;

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
                                            elemento.src = 'dist/mp3/AD/' + this.audio;

                                            playerObra.children[0].insertAdjacentElement('beforeend', elemento);

                                            this.insertAdjacentElement('beforeend', playerObra);

                                            this.getElementsByTagName("audio")[0].play()

                                            indicadorAudio = -1;
                                        }
                                        else 
                                        {
                                            $(".playerObra").remove();

                                            player_audio.src = 'dist/mp3/botoes/' + this.audio;
                                            player_audio.play();

                                            indicadorAudio = this.indexObra;
                                        }
                                    }

                                    elementoObras.insertAdjacentElement('beforeend', elemento);

                                    elemento = document.createElement('div');
                                    $(elemento).addClass('row');
                                    $(elemento).addClass('titulo');
                                    elementoObras.lastElementChild.insertAdjacentElement('beforeend', elemento);

                                    elemento = document.createElement('div');
                                    $(elemento).addClass('col-sm-12');
                                    elementoObras.lastElementChild.children[0].insertAdjacentElement('beforeend', elemento);

                                    elemento = document.createElement('a');
                                    elementoObras.lastElementChild.children[0].insertAdjacentElement('beforeend', elemento);

                                    elemento = document.createElement('div');
                                    $(elemento).addClass('info-box');
                                    elementoObras.lastElementChild.children[0].children[0].insertAdjacentElement('beforeend', elemento);

                                    elemento = document.createElement('span');
                                    $(elemento).addClass('info-box-icon');
                                    $(elemento).addClass('bg-green');
                                    elementoObras.lastElementChild.children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);

                                    elemento = document.createElement('i');
                                    $(elemento).addClass('fa');
                                    elementoObras.lastElementChild.children[0].children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);
                                    
                                    elemento = document.createElement('div');
                                    $(elemento).addClass('info-box-content');
                                    elementoObras.lastElementChild.children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);
                                    
                                    elemento = document.createElement('span');
                                    $(elemento).addClass('info-box-text');
                                    elementoObras.lastElementChild.children[0].children[0].children[0].children[1].insertAdjacentElement('beforeend', elemento);

                                    elemento = document.createElement('h3');
                                    elemento.textContent = obras[contObras].nome.toLocaleUpperCase();
                                    elementoObras.lastElementChild.children[0].children[0].children[0].children[1].children[0].insertAdjacentElement('beforeend', elemento);

                                    
                                    //elemento.src = (("audio" in obras[contObras]) && obras[contObras].video != '#' && obras[contObras].video != '') ? 'dist/mp3/' + obras[contObras].audio : '#';                                   
                                }

                                elementoSubArea.insertAdjacentElement('beforeend', elementoObras);
                            }
                            
                            lst_audios.insertAdjacentElement('beforeend', elementoSubArea);
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