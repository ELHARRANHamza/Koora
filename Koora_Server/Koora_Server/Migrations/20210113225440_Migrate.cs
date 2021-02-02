using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Koora_Server.Migrations
{
    public partial class Migrate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cat_Nom = table.Column<string>(maxLength: 35, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Champions",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: true),
                    image = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Champions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Contry",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(maxLength: 30, nullable: false),
                    image = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contry", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: false),
                    message = table.Column<string>(nullable: false),
                    email = table.Column<string>(nullable: false),
                    date_Poste = table.Column<DateTime>(nullable: false),
                    etat = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    roleName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Tvs",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nom = table.Column<string>(nullable: true),
                    logo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tvs", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titre = table.Column<string>(maxLength: 250, nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    date_Publiciter = table.Column<DateTime>(nullable: false),
                    GetCategoriesid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.id);
                    table.ForeignKey(
                        name: "FK_News_Categories_GetCategoriesid",
                        column: x => x.GetCategoriesid,
                        principalTable: "Categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nom = table.Column<string>(nullable: true),
                    logo = table.Column<string>(nullable: true),
                    contryid = table.Column<int>(nullable: true),
                    Categorieid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.id);
                    table.ForeignKey(
                        name: "FK_Teams_Categories_Categorieid",
                        column: x => x.Categorieid,
                        principalTable: "Categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Teams_Contry_contryid",
                        column: x => x.contryid,
                        principalTable: "Contry",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nom = table.Column<string>(maxLength: 25, nullable: false),
                    prenom = table.Column<string>(maxLength: 25, nullable: false),
                    email = table.Column<string>(maxLength: 30, nullable: false),
                    userName = table.Column<string>(maxLength: 25, nullable: false),
                    image = table.Column<string>(nullable: true),
                    password = table.Column<byte[]>(nullable: true),
                    passwordSalt = table.Column<byte[]>(nullable: true),
                    rolesid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_rolesid",
                        column: x => x.rolesid,
                        principalTable: "Roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "collectionTeams",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    teamid = table.Column<int>(nullable: true),
                    championsid = table.Column<int>(nullable: true),
                    point = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_collectionTeams", x => x.id);
                    table.ForeignKey(
                        name: "FK_collectionTeams_Champions_championsid",
                        column: x => x.championsid,
                        principalTable: "Champions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_collectionTeams_Teams_teamid",
                        column: x => x.teamid,
                        principalTable: "Teams",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date_Match = table.Column<DateTime>(nullable: false),
                    team_Allerid = table.Column<int>(nullable: true),
                    team_Retourid = table.Column<int>(nullable: true),
                    res_TeamAller = table.Column<int>(nullable: false),
                    res_TeamRetour = table.Column<int>(nullable: false),
                    stade = table.Column<string>(nullable: true),
                    championsid = table.Column<int>(nullable: true),
                    etat = table.Column<int>(nullable: false),
                    type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.id);
                    table.ForeignKey(
                        name: "FK_Matches_Champions_championsid",
                        column: x => x.championsid,
                        principalTable: "Champions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matches_Teams_team_Allerid",
                        column: x => x.team_Allerid,
                        principalTable: "Teams",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Matches_Teams_team_Retourid",
                        column: x => x.team_Retourid,
                        principalTable: "Teams",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Firstname = table.Column<string>(nullable: true),
                    lastName = table.Column<string>(nullable: true),
                    image = table.Column<string>(nullable: true),
                    poste = table.Column<string>(nullable: true),
                    date_Nais = table.Column<DateTime>(nullable: false),
                    nombre = table.Column<int>(nullable: false),
                    nationality = table.Column<string>(nullable: true),
                    about = table.Column<string>(nullable: true),
                    vote = table.Column<string>(nullable: true),
                    teamid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.id);
                    table.ForeignKey(
                        name: "FK_Players_Teams_teamid",
                        column: x => x.teamid,
                        principalTable: "Teams",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Commentaires",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    commentaire = table.Column<string>(maxLength: 200, nullable: false),
                    newsid = table.Column<int>(nullable: true),
                    pos = table.Column<int>(nullable: false),
                    date_Cmt = table.Column<DateTime>(nullable: false),
                    usersid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commentaires", x => x.id);
                    table.ForeignKey(
                        name: "FK_Commentaires_News_newsid",
                        column: x => x.newsid,
                        principalTable: "News",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Commentaires_Users_usersid",
                        column: x => x.usersid,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Match_TV",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    matchid = table.Column<int>(nullable: true),
                    tvid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Match_TV", x => x.id);
                    table.ForeignKey(
                        name: "FK_Match_TV_Matches_matchid",
                        column: x => x.matchid,
                        principalTable: "Matches",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Match_TV_Tvs_tvid",
                        column: x => x.tvid,
                        principalTable: "Tvs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Goals",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    playersid = table.Column<int>(nullable: true),
                    matchid = table.Column<int>(nullable: true),
                    minute = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goals", x => x.id);
                    table.ForeignKey(
                        name: "FK_Goals_Matches_matchid",
                        column: x => x.matchid,
                        principalTable: "Matches",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Goals_Players_playersid",
                        column: x => x.playersid,
                        principalTable: "Players",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "reponseCommentaires",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    reponse = table.Column<string>(nullable: true),
                    commentaireid = table.Column<int>(nullable: true),
                    usersid = table.Column<int>(nullable: true),
                    dateReponse = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reponseCommentaires", x => x.id);
                    table.ForeignKey(
                        name: "FK_reponseCommentaires_Commentaires_commentaireid",
                        column: x => x.commentaireid,
                        principalTable: "Commentaires",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_reponseCommentaires_Users_usersid",
                        column: x => x.usersid,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_collectionTeams_championsid",
                table: "collectionTeams",
                column: "championsid");

            migrationBuilder.CreateIndex(
                name: "IX_collectionTeams_teamid",
                table: "collectionTeams",
                column: "teamid");

            migrationBuilder.CreateIndex(
                name: "IX_Commentaires_newsid",
                table: "Commentaires",
                column: "newsid");

            migrationBuilder.CreateIndex(
                name: "IX_Commentaires_usersid",
                table: "Commentaires",
                column: "usersid");

            migrationBuilder.CreateIndex(
                name: "IX_Goals_matchid",
                table: "Goals",
                column: "matchid");

            migrationBuilder.CreateIndex(
                name: "IX_Goals_playersid",
                table: "Goals",
                column: "playersid");

            migrationBuilder.CreateIndex(
                name: "IX_Match_TV_matchid",
                table: "Match_TV",
                column: "matchid");

            migrationBuilder.CreateIndex(
                name: "IX_Match_TV_tvid",
                table: "Match_TV",
                column: "tvid");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_championsid",
                table: "Matches",
                column: "championsid");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_team_Allerid",
                table: "Matches",
                column: "team_Allerid");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_team_Retourid",
                table: "Matches",
                column: "team_Retourid");

            migrationBuilder.CreateIndex(
                name: "IX_News_GetCategoriesid",
                table: "News",
                column: "GetCategoriesid");

            migrationBuilder.CreateIndex(
                name: "IX_Players_teamid",
                table: "Players",
                column: "teamid");

            migrationBuilder.CreateIndex(
                name: "IX_reponseCommentaires_commentaireid",
                table: "reponseCommentaires",
                column: "commentaireid");

            migrationBuilder.CreateIndex(
                name: "IX_reponseCommentaires_usersid",
                table: "reponseCommentaires",
                column: "usersid");

            migrationBuilder.CreateIndex(
                name: "IX_Teams_Categorieid",
                table: "Teams",
                column: "Categorieid");

            migrationBuilder.CreateIndex(
                name: "IX_Teams_contryid",
                table: "Teams",
                column: "contryid");

            migrationBuilder.CreateIndex(
                name: "IX_Users_rolesid",
                table: "Users",
                column: "rolesid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "collectionTeams");

            migrationBuilder.DropTable(
                name: "Goals");

            migrationBuilder.DropTable(
                name: "Match_TV");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "reponseCommentaires");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "Matches");

            migrationBuilder.DropTable(
                name: "Tvs");

            migrationBuilder.DropTable(
                name: "Commentaires");

            migrationBuilder.DropTable(
                name: "Champions");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Contry");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
