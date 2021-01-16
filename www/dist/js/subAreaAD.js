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

                $(".playerObra").remove();

                player_audio.pause();
                player_audio.src = 'dist/mp3/botoes/btn_voltar.mp3';
                player_audio.play();
            }

            return false;
        }

        this.getAreas();
    },
    getAreas: function()
    {
        $.getJSON
        (
            "dist/js/obrasAD.json", 
            function(dados)
            {
                areasAD = dados.areas;

                parametros = new URL(window.location.href).searchParams;
                indexArea = parametros.get('indexArea');

                var areaAD = areasAD[indexArea];

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

                        $(".playerObra").remove();

                        player_audio.pause();
                        player_audio.src = 'dist/mp3/botoes/btn_proxima_area.mp3';
                        player_audio.play();
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

                        $(".playerObra").remove();

                        player_audio.pause();
                        player_audio.src = 'dist/mp3/botoes/btn_area_anterior.mp3';
                        player_audio.play();
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

                lbl_titulo_area.textContent = areaAD.nome.toLocaleUpperCase();
                titulo_introducao.textContent = areaAD.tituloIntroducao.toLocaleUpperCase();
                introducao.audioBotao = areaAD.audioIntroducao;

                introducao.onclick = function()
                {
                    player_audio.pause();
                    
                    if (indicadorAudio == this.indexSubArea)
                    {
                        playerObra = document.createElement('div');
                        $(playerObra).addClass('row');
                        $(playerObra).addClass('playerObra');

                        elemento = document.createElement('div');
                        $(elemento).addClass("col-sm-12")

                        playerObra.insertAdjacentElement('beforeend', elemento);

                        elemento = document.createElement('audio');
                        elemento.controls = true;

                        source = document.createElement('source');
                        source.src = 'dist/mp3/AD/' + this.audioBotao;
                        source.type = 'audio/mpeg';

                        elemento.insertAdjacentElement('beforeend', source);

                        playerObra.children[0].insertAdjacentElement('beforeend', elemento);

                        this.insertAdjacentElement('beforeend', playerObra);

                        this.getElementsByTagName("audio")[0].play()

                        indicadorAudio = -1;
                    }
                    else
                    {
                        $(".playerObra").remove();

                        player_audio.src = 'dist/mp3/botoes/' + this.audioBotao;
                        player_audio.play();

                        indicadorAudio = this.indexSubArea;
                    }
                }

                while (lst_subAreas.firstChild)
                {
                    lst_subAreas.removeChild(lst_subAreas.firstChild);
                }
                
                for (cont = 0; cont <= areaAD.subAreas.length - 1; cont = cont + 1)
                {
                    var subArea = areaAD.subAreas[cont];

                    if ('titulo' in subArea)
                    {
                        var elementoArea = document.createElement('div');
                        $(elementoArea).addClass('row');

                        var elemento = document.createElement('div');
                        $(elemento).addClass('col-sm-12');
                        elementoArea.insertAdjacentElement('beforeend', elemento);

                        elemento = document.createElement('a');
                        elemento.id = subArea.hash;
                        elemento.indexSubArea = cont;
                        elemento.audioBotao = subArea.audioBotao;

                        elemento.onclick = function()
                        {
                            if (indicadorAudio == this.indexSubArea)
                            {
                                history.replaceState({}, 'Área', 'areaAD.html?indexArea=' + indexArea + '&hash=' + this.id);
                                window.location.reload();
                            }
                            else
                            {
                                $(".playerObra").remove();
                                
                                player_audio.pause();
                                player_audio.src = 'dist/mp3/botoes/' + this.audioBotao;
                                player_audio.play();

                                indicadorAudio = this.indexSubArea;
                            }
                        }

                        elementoArea.children[0].insertAdjacentElement('beforeend', elemento);

                        elemento = document.createElement('div');
                        $(elemento).addClass('info-box');
                        elementoArea.children[0].children[0].insertAdjacentElement('beforeend', elemento);

                        elemento = document.createElement('span');
                        $(elemento).addClass('info-box-icon');
                        $(elemento).addClass('bg-green');
                        elementoArea.children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);

                        elemento = document.createElement('i');
                        $(elemento).addClass('fa');
                        elementoArea.children[0].children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);
                        
                        elemento = document.createElement('div');
                        $(elemento).addClass('info-box-content');
                        elementoArea.children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);
                        
                        elemento = document.createElement('span');
                        $(elemento).addClass('info-box-text');
                        elemento.textContent = subArea.titulo.toLocaleUpperCase();
                        elementoArea.children[0].children[0].children[0].children[1].insertAdjacentElement('beforeend', elemento);

                        lst_subAreas.insertAdjacentElement('beforeend', elementoArea);
                    }
                }
            }
        );
    }
};

app.initialize();