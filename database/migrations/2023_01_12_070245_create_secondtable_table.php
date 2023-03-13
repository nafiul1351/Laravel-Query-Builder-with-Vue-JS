<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('secondtable', function (Blueprint $table) {
            $table->id();
            $table->string('stext');
            $table->unsignedBigInteger('ft_id');
            $table->foreign('ft_id')->references('id')->on('firsttable')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('secondtable');
    }
};
