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
        this.getAreas();
    },
    getAreas: function()
    {
        $.getJSON
        (
            "dist/js/obrasLibras.json", 
            function(dados)
            {
                areasLibras = dados.areas;

                parametros = new URL(window.location.href).searchParams;
                indexArea = parametros.get('indexArea');

                var areaLibras = areasLibras[indexArea];

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

                lbl_titulo_area.textContent = areaLibras.nome.toLocaleUpperCase();

                video_introducao.src = 'dist/mp4/' + areaLibras.videoIntroducao;
                video_introducao.poster = 'dist/mp4/' + areaLibras.videoIntroducao.replace('mp4', 'jpg');

                while (lst_subAreas.firstChild)
                {
                    lst_subAreas.removeChild(lst_subAreas.firstChild);
                }
                
                for (cont = 0; cont <= areaLibras.subAreas.length - 1; cont = cont + 1)
                {
                    var subArea = areaLibras.subAreas[cont];

                    if ('titulo' in subArea)
                    {
                        var elementoArea = document.createElement('div');
                        $(elementoArea).addClass('row');

                        var elemento = document.createElement('div');
                        $(elemento).addClass('col-sm-12');
                        elementoArea.insertAdjacentElement('beforeend', elemento);

                        elemento = document.createElement('a');
                        elemento.id = subArea.hash;

                        elemento.onclick = function()
                        {
                            history.replaceState({}, 'Área', 'areaLibras.html?indexArea=' + indexArea + '&hash=' + this.id);
                            window.location.reload();
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